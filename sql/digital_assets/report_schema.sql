-- CoreBrief Supabase Database Schema
-- Run this SQL in your Supabase SQL editor to create the required tables

-- Company analysis results table
CREATE TABLE IF NOT EXISTS company_analyses (
    -- Primary key: ticker + years_range uniquely identifies each analysis
    ticker VARCHAR(10) NOT NULL,
    years_range VARCHAR(20) NOT NULL,
    
    -- JSON analysis outputs (stored as TEXT to allow flexible JSON structures)
    multi_year_analysis TEXT NOT NULL,
    management_credibility TEXT NOT NULL,
    predictive_inference TEXT NOT NULL,
    business_assessment TEXT NOT NULL,
    
    -- Analysis metadata
    analysis_metadata JSONB,
    years_used INTEGER[],
    analysis_years INTEGER,
    model_used VARCHAR(50),
    generated_at TIMESTAMPTZ,
    
    -- Access control
    is_free BOOLEAN DEFAULT FALSE,
    
    -- System metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Composite primary key
    PRIMARY KEY (ticker, years_range)
);

-- User purchases table to track who bought what
-- Note: Fixed to reference auth.users(id) directly for consistency with other user tables
CREATE TABLE IF NOT EXISTS user_purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    ticker VARCHAR(10) NOT NULL,
    years_range VARCHAR(20) NOT NULL,
    price_paid_cents INTEGER NOT NULL,
    purchased_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Foreign key to company_analyses
    FOREIGN KEY (ticker, years_range) REFERENCES company_analyses(ticker, years_range),
    
    -- Prevent duplicate purchases
    UNIQUE(user_id, ticker, years_range)
);

-- Fix existing constraint if table already exists with wrong reference
DO $$ 
DECLARE 
    constraint_name_var TEXT;
BEGIN
    -- Find the constraint name for user_id foreign key
    SELECT tc.constraint_name INTO constraint_name_var
    FROM information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
    WHERE tc.constraint_type = 'FOREIGN KEY' 
      AND tc.table_name = 'user_purchases'
      AND kcu.column_name = 'user_id'
      AND ccu.table_name = 'user_profiles'; -- Looking for the wrong reference
    
    -- Drop and recreate constraint if it references user_profiles instead of auth.users
    IF constraint_name_var IS NOT NULL THEN
        EXECUTE 'ALTER TABLE user_purchases DROP CONSTRAINT ' || constraint_name_var;
        ALTER TABLE user_purchases 
        ADD CONSTRAINT user_purchases_user_id_fkey 
        FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
        RAISE NOTICE 'Fixed user_purchases constraint to reference auth.users(id)';
    END IF;
END $$;

-- Create an index on updated_at for faster sorting
CREATE INDEX IF NOT EXISTS idx_company_analyses_updated_at 
ON company_analyses (updated_at DESC);

-- Create an index on ticker for faster lookups
CREATE INDEX IF NOT EXISTS idx_company_analyses_ticker 
ON company_analyses (ticker);

-- Create an index on free reports for discovery
CREATE INDEX IF NOT EXISTS idx_company_analyses_free 
ON company_analyses (is_free) WHERE is_free = true;

-- Create indexes for user_purchases
CREATE INDEX IF NOT EXISTS idx_user_purchases_user_id 
ON user_purchases (user_id);

CREATE INDEX IF NOT EXISTS idx_user_purchases_ticker 
ON user_purchases (ticker, years_range);

-- Optional: Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Create trigger to automatically update updated_at on row updates
DROP TRIGGER IF EXISTS update_company_analyses_updated_at ON company_analyses;
CREATE TRIGGER update_company_analyses_updated_at
    BEFORE UPDATE ON company_analyses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) for pay-per-report access
ALTER TABLE company_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_purchases ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Allow public to see analysis metadata" ON company_analyses;
DROP POLICY IF EXISTS "Users can see their own purchases" ON user_purchases;
DROP POLICY IF EXISTS "Users can insert their own purchases" ON user_purchases;
DROP POLICY IF EXISTS "Service role can manage analyses" ON company_analyses;
DROP POLICY IF EXISTS "Service role can manage purchases" ON user_purchases;

-- Policy 1: Everyone can see basic info (ticker, years_range, price, etc.) but NOT the analysis content
CREATE POLICY "Allow public to see analysis metadata" ON company_analyses
    FOR SELECT USING (true);

-- Policy 2: Only users who purchased or free reports can see full analysis content
-- Note: This would need to be implemented in your application logic since RLS can't easily 
-- filter specific columns. Instead, use a view or application-level filtering.

-- Policy 3: Only authenticated users can see their own purchases
CREATE POLICY "Users can see their own purchases" ON user_purchases
    FOR SELECT USING (auth.uid() = user_id);

-- Policy 4: Only authenticated users can insert their own purchases
CREATE POLICY "Users can insert their own purchases" ON user_purchases
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy 5: Admin/service role can do everything (for your backend operations)
CREATE POLICY "Service role can manage analyses" ON company_analyses
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role can manage purchases" ON user_purchases
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Create a view for public access (metadata only, no analysis content)
CREATE OR REPLACE VIEW public_analyses AS
SELECT 
    ticker,
    years_range,
    years_used,
    analysis_years,
    model_used,
    generated_at,
    is_free,
    created_at,
    updated_at
FROM company_analyses;

-- Create a view for purchased analyses (includes full content)
CREATE OR REPLACE VIEW user_accessible_analyses AS
SELECT 
    ca.*,
    CASE 
        WHEN ca.is_free = true THEN true
        WHEN up.user_id IS NOT NULL THEN true
        ELSE false
    END as has_access
FROM company_analyses ca
LEFT JOIN user_purchases up ON (
    ca.ticker = up.ticker 
    AND ca.years_range = up.years_range 
    AND up.user_id = auth.uid()
);

-- Enable RLS on views
ALTER VIEW public_analyses OWNER TO postgres;
ALTER VIEW user_accessible_analyses OWNER TO postgres;
