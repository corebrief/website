-- Migration: Add Enhanced Sign-up Fields
-- Run this in Supabase SQL Editor if you have existing user data

-- Add new columns to user_profiles table
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS organization_name TEXT,
ADD COLUMN IF NOT EXISTS organization_type TEXT CHECK (organization_type IN ('family_office', 'ria', 'asset_manager', 'individual', 'other')),
ADD COLUMN IF NOT EXISTS role_title TEXT,
ADD COLUMN IF NOT EXISTS aum_range TEXT CHECK (aum_range IN ('under_10m', '10m_50m', '50m_250m', '250m_1b', 'over_1b', 'prefer_not_to_say')),
ADD COLUMN IF NOT EXISTS phone_number TEXT,
ADD COLUMN IF NOT EXISTS primary_asset_classes TEXT[],
ADD COLUMN IF NOT EXISTS investment_focus TEXT CHECK (investment_focus IN ('conservative_income', 'growth', 'balanced', 'value', 'other')),
ADD COLUMN IF NOT EXISTS current_research_providers TEXT,
ADD COLUMN IF NOT EXISTS referral_source TEXT,
ADD COLUMN IF NOT EXISTS referral_code TEXT;

-- Update the trigger function to handle new fields
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
    referral_code
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
    NEW.raw_user_meta_data->>'referral_code'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = ''; 