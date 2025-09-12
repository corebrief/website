-- Migration: Privacy Compliance Features
-- Run this in Supabase SQL Editor to add privacy compliance functionality

-- Add privacy-related columns to user_profiles table
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS marketing_consent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS marketing_consent_date TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS cookie_consent JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS communication_preferences JSONB DEFAULT '{"email_updates": true, "research_reports": true, "marketing": false}';

-- Create privacy requests audit table
CREATE TABLE IF NOT EXISTS public.privacy_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  request_type TEXT CHECK (request_type IN ('data_export', 'data_deletion', 'consent_withdrawal', 'data_correction')) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'processing', 'completed', 'rejected')) DEFAULT 'pending',
  request_details JSONB DEFAULT '{}',
  response_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  completed_by UUID REFERENCES auth.users(id),
  notes TEXT
);

-- Enable RLS on privacy_requests table
ALTER TABLE public.privacy_requests ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for privacy_requests
CREATE POLICY "Users can view own privacy requests" ON public.privacy_requests
  FOR SELECT 
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own privacy requests" ON public.privacy_requests
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Service role can manage all privacy requests (for admin operations)
CREATE POLICY "Service role full access to privacy requests" ON public.privacy_requests
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Update the user creation trigger to handle new privacy fields
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
    communication_preferences
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
    COALESCE(NEW.raw_user_meta_data->'communication_preferences', '{"email_updates": true, "research_reports": true, "marketing": false}'::jsonb)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_privacy_requests_user_id ON public.privacy_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_privacy_requests_status ON public.privacy_requests(status);
CREATE INDEX IF NOT EXISTS idx_privacy_requests_type ON public.privacy_requests(request_type);

-- Grant necessary permissions
GRANT SELECT, INSERT ON public.privacy_requests TO authenticated; 