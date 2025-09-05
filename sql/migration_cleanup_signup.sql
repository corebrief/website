-- Migration: Clean up signup fields and add consent tracking
-- This migration aligns the database with the streamlined signup form
-- NOTE: This assumes you've already run the waitlist and privacy migrations

-- Add new consent and agreement columns (only if not already added by privacy migration)
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS terms_agreement BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS terms_agreed_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS privacy_agreed_at TIMESTAMPTZ;

-- Update the trigger function to handle ALL fields from previous migrations + new cleanup
-- This replaces the function from waitlist migration to work with streamlined signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (
    id, 
    email, 
    full_name, 
    avatar_url,
    -- Organization fields (keeping these as they're still in the form)
    organization_name,
    organization_type,
    -- Referral fields (keeping these)
    referral_source,
    referral_code,
    -- Privacy/consent fields (from privacy migration + new terms)
    marketing_consent,
    marketing_consent_date,
    cookie_consent,
    communication_preferences,
    terms_agreement,
    terms_agreed_at,
    privacy_agreed_at,
    -- Waitlist fields (from waitlist migration)
    waitlist_status,
    waitlist_joined_at,
    early_access_requested
    -- NOTE: Removed fields that are no longer in the form:
    -- role_title, aum_range, phone_number, investment_focus, 
    -- primary_asset_classes, current_research_providers
  )
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'full_name', 
    NEW.raw_user_meta_data->>'avatar_url',
    -- Organization
    NEW.raw_user_meta_data->>'organization_name',
    NEW.raw_user_meta_data->>'organization_type',
    -- Referral
    NEW.raw_user_meta_data->>'referral_source',
    NEW.raw_user_meta_data->>'referral_code',
    -- Privacy/consent
    COALESCE((NEW.raw_user_meta_data->>'marketing_consent')::boolean, FALSE),
    CASE 
      WHEN (NEW.raw_user_meta_data->>'marketing_consent')::boolean = TRUE 
      THEN NOW() 
      ELSE NULL 
    END,
    COALESCE(NEW.raw_user_meta_data->'cookie_consent', '{}'::jsonb),
    COALESCE(NEW.raw_user_meta_data->'communication_preferences', '{"email_updates": true, "research_reports": true, "marketing": false}'::jsonb),
    COALESCE((NEW.raw_user_meta_data->>'terms_agreement')::boolean, FALSE),
    CASE 
      WHEN (NEW.raw_user_meta_data->>'terms_agreement')::boolean = TRUE 
      THEN NOW() 
      ELSE NULL 
    END,
    CASE 
      WHEN (NEW.raw_user_meta_data->>'terms_agreement')::boolean = TRUE 
      THEN NOW() 
      ELSE NULL 
    END,
    -- Waitlist
    'pending',
    NOW(),
    FALSE
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Optional: Add indexes for consent tracking (useful for compliance queries)
CREATE INDEX IF NOT EXISTS idx_user_profiles_terms_agreement 
ON public.user_profiles(terms_agreement, terms_agreed_at);

CREATE INDEX IF NOT EXISTS idx_user_profiles_marketing_consent 
ON public.user_profiles(marketing_consent);

-- Optional: Create a view for compliance reporting
CREATE OR REPLACE VIEW public.user_consent_audit AS
SELECT 
  id,
  email,
  full_name,
  organization_name,
  organization_type,
  terms_agreement,
  terms_agreed_at,
  privacy_agreed_at,
  marketing_consent,
  created_at
FROM public.user_profiles
WHERE terms_agreement = TRUE;

-- Grant appropriate permissions for the view
GRANT SELECT ON public.user_consent_audit TO authenticated;

-- Note: Views don't support RLS policies directly
-- Access control is handled through the underlying user_profiles table RLS policies
