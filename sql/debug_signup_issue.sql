-- Debug script to identify the signup issue
-- Run these queries one by one in Supabase SQL Editor to diagnose the problem

-- 1. Check if all required columns exist
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
  AND table_schema = 'public'
  AND column_name IN (
    'referral_code', 'marketing_consent', 'marketing_consent_date',
    'terms_agreement', 'terms_agreed_at', 'professional_use',
    'communication_preferences'
  )
ORDER BY column_name;

-- 2. Check the current trigger function
SELECT routine_definition 
FROM information_schema.routines 
WHERE routine_name = 'handle_new_user' 
  AND routine_schema = 'public';

-- 3. Check organization_type constraint values
SELECT constraint_name, check_clause
FROM information_schema.check_constraints
WHERE constraint_name LIKE '%organization_type%';

-- 4. Test the trigger function manually (replace with actual test data)
-- This will help identify exactly where the error occurs
/*
SELECT public.handle_new_user() FROM (
  SELECT 
    gen_random_uuid() as id,
    'test@example.com' as email,
    '{"full_name": "Test User", "organization_name": "Test Org", "organization_type": "individual_investor", "referral_source": "google", "referral_code": "", "marketing_consent": "true", "terms_agreement": "true", "professional_use": "true"}'::jsonb as raw_user_meta_data
) as test_data;
*/

-- 5. Check if there are any triggers on the user_profiles table that might conflict
SELECT trigger_name, event_manipulation, action_timing, action_statement
FROM information_schema.triggers
WHERE event_object_table = 'user_profiles'
  AND event_object_schema = 'public';

-- 6. Check recent error logs (if you have access to them)
-- Look for any constraint violations or column errors
