-- Fix for signup database error
-- This creates a corrected trigger function that matches the current signup form exactly
-- Run this in Supabase SQL Editor

-- Add any missing columns that might not exist
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS referral_code TEXT,
ADD COLUMN IF NOT EXISTS marketing_consent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS marketing_consent_date TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS terms_agreement BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS terms_agreed_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS professional_use BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS communication_preferences JSONB DEFAULT '{"email_updates": true, "research_reports": true, "marketing": false}';

-- Fix organization_type constraint to match form values
-- First, completely drop the existing constraint
ALTER TABLE public.user_profiles 
DROP CONSTRAINT IF EXISTS user_profiles_organization_type_check;

-- Clean up any existing invalid data
UPDATE public.user_profiles 
SET organization_type = CASE 
  WHEN organization_type = 'individual' THEN 'individual_investor'
  WHEN organization_type = 'asset_manager' THEN 'asset_manager'  -- already correct
  WHEN organization_type = 'family_office' THEN 'family_office'  -- already correct
  WHEN organization_type = 'ria' THEN 'ria'  -- already correct
  WHEN organization_type = 'other' THEN 'other'  -- already correct
  WHEN organization_type = 'cb' THEN 'other'  -- fix test data
  WHEN organization_type = 'individual_investor' THEN 'individual_investor'  -- already correct
  WHEN organization_type = 'financial_advisor' THEN 'financial_advisor'  -- already correct
  WHEN organization_type = 'hedge_fund' THEN 'hedge_fund'  -- already correct
  ELSE 'other'  -- fallback for any unexpected values
END
WHERE organization_type IS NOT NULL 
  AND organization_type NOT IN ('individual_investor', 'financial_advisor', 'family_office', 'ria', 'asset_manager', 'hedge_fund', 'other');

-- Now add the new constraint with correct values
ALTER TABLE public.user_profiles 
ADD CONSTRAINT user_profiles_organization_type_check 
CHECK (organization_type IN ('individual_investor', 'financial_advisor', 'family_office', 'ria', 'asset_manager', 'hedge_fund', 'other'));

-- Create corrected trigger function that matches ALL current signup form fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (
    id, 
    email, 
    full_name,
    avatar_url,
    organization_name,
    organization_type,
    referral_source,
    referral_code,
    marketing_consent,
    marketing_consent_date,
    terms_agreement,
    terms_agreed_at,
    professional_use,
    communication_preferences
  )
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'organization_name',
    NEW.raw_user_meta_data->>'organization_type',
    NEW.raw_user_meta_data->>'referral_source',
    NEW.raw_user_meta_data->>'referral_code',
    COALESCE((NEW.raw_user_meta_data->>'marketing_consent')::boolean, FALSE),
    CASE 
      WHEN (NEW.raw_user_meta_data->>'marketing_consent')::boolean = TRUE 
      THEN NOW() 
      ELSE NULL 
    END,
    COALESCE((NEW.raw_user_meta_data->>'terms_agreement')::boolean, FALSE),
    CASE 
      WHEN (NEW.raw_user_meta_data->>'terms_agreement')::boolean = TRUE 
      THEN NOW() 
      ELSE NULL 
    END,
    COALESCE((NEW.raw_user_meta_data->>'professional_use')::boolean, FALSE),
    COALESCE(NEW.raw_user_meta_data->'communication_preferences', '{"email_updates": true, "research_reports": true, "marketing": false}'::jsonb)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Note: The trigger should already exist from previous migrations
-- If you need to recreate it, run these commands separately:
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
