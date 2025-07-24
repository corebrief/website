-- Migration: Add Waitlist Functionality
-- Run this in Supabase SQL Editor to add waitlist tracking

-- Add waitlist columns to user_profiles table
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS waitlist_status TEXT CHECK (waitlist_status IN ('pending', 'approved', 'notified', 'converted')) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS waitlist_joined_at TIMESTAMPTZ DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS waitlist_position INTEGER,
ADD COLUMN IF NOT EXISTS waitlist_notes TEXT,
ADD COLUMN IF NOT EXISTS early_access_requested BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS early_access_granted BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS early_access_granted_at TIMESTAMPTZ;

-- Create waitlist requests table for detailed tracking
CREATE TABLE IF NOT EXISTS public.waitlist_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  request_type TEXT CHECK (request_type IN ('early_access', 'pricing_notification', 'beta_access', 'custom_demo')) DEFAULT 'early_access',
  priority_level TEXT CHECK (priority_level IN ('standard', 'high', 'urgent')) DEFAULT 'standard',
  requested_features TEXT[],
  use_case_description TEXT,
  timeline_urgency TEXT,
  budget_range TEXT,
  team_size INTEGER,
  current_tools TEXT[],
  status TEXT CHECK (status IN ('pending', 'reviewed', 'approved', 'rejected', 'converted')) DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ
);

-- Enable RLS on waitlist_requests table
ALTER TABLE public.waitlist_requests ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for waitlist_requests
CREATE POLICY "Users can view own waitlist requests" ON public.waitlist_requests
  FOR SELECT 
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own waitlist requests" ON public.waitlist_requests
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own waitlist requests" ON public.waitlist_requests
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Service role can manage all waitlist requests (for admin operations)
CREATE POLICY "Service role full access to waitlist requests" ON public.waitlist_requests
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Function to automatically update waitlist position
CREATE OR REPLACE FUNCTION update_waitlist_positions()
RETURNS TRIGGER AS $$
BEGIN
  -- Update waitlist positions based on join date
  WITH ranked_users AS (
    SELECT 
      id,
      ROW_NUMBER() OVER (ORDER BY waitlist_joined_at ASC) as new_position
    FROM public.user_profiles 
    WHERE waitlist_status = 'pending'
  )
  UPDATE public.user_profiles 
  SET waitlist_position = ranked_users.new_position
  FROM ranked_users 
  WHERE user_profiles.id = ranked_users.id;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update positions when waitlist status changes
CREATE OR REPLACE TRIGGER trigger_update_waitlist_positions
    AFTER INSERT OR UPDATE OF waitlist_status ON public.user_profiles
    FOR EACH STATEMENT
    EXECUTE FUNCTION update_waitlist_positions();

-- Update the user creation trigger to initialize waitlist status
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
    role_title,
    aum_range,
    phone_number,
    investment_focus,
    primary_asset_classes,
    current_research_providers,
    referral_source,
    referral_code,
    marketing_consent,
    marketing_consent_date,
    cookie_consent,
    communication_preferences,
    waitlist_status,
    waitlist_joined_at,
    early_access_requested
  )
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'full_name', 
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'organization_name',
    NEW.raw_user_meta_data->>'organization_type',
    NEW.raw_user_meta_data->>'role_title',
    NEW.raw_user_meta_data->>'aum_range',
    NEW.raw_user_meta_data->>'phone_number',
    NEW.raw_user_meta_data->>'investment_focus',
    CASE 
      WHEN NEW.raw_user_meta_data->'primary_asset_classes' IS NOT NULL 
      THEN ARRAY(SELECT jsonb_array_elements_text(NEW.raw_user_meta_data->'primary_asset_classes'))
      ELSE NULL 
    END,
    NEW.raw_user_meta_data->>'current_research_providers',
    NEW.raw_user_meta_data->>'referral_source',
    NEW.raw_user_meta_data->>'referral_code',
    COALESCE((NEW.raw_user_meta_data->>'marketing_consent')::boolean, false),
    CASE 
      WHEN (NEW.raw_user_meta_data->>'marketing_consent')::boolean = true 
      THEN NOW() 
      ELSE NULL 
    END,
    COALESCE(NEW.raw_user_meta_data->'cookie_consent', '{}'::jsonb),
    COALESCE(NEW.raw_user_meta_data->'communication_preferences', '{"email_updates": true, "research_reports": true, "marketing": false}'::jsonb),
    'pending',
    NOW(),
    false
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_waitlist_requests_user_id ON public.waitlist_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_waitlist_requests_status ON public.waitlist_requests(status);
CREATE INDEX IF NOT EXISTS idx_waitlist_requests_priority ON public.waitlist_requests(priority_level);
CREATE INDEX IF NOT EXISTS idx_user_profiles_waitlist_status ON public.user_profiles(waitlist_status);
CREATE INDEX IF NOT EXISTS idx_user_profiles_waitlist_position ON public.user_profiles(waitlist_position);

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE ON public.waitlist_requests TO authenticated; 