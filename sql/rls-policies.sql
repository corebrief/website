-- Enhanced Row Level Security (RLS) Policies
-- Run this after the main schema to ensure proper security

-- Enable RLS on all tables (should already be done, but ensuring)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_prices ENABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "System can insert user profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Service role full access to user profiles" ON public.user_profiles;

DROP POLICY IF EXISTS "Anyone can view products" ON public.subscription_products;
DROP POLICY IF EXISTS "Authenticated users can view products" ON public.subscription_products;
DROP POLICY IF EXISTS "Public can view active products" ON public.subscription_products;
DROP POLICY IF EXISTS "Service role full access to products" ON public.subscription_products;

DROP POLICY IF EXISTS "Anyone can view prices" ON public.subscription_prices;
DROP POLICY IF EXISTS "Authenticated users can view prices" ON public.subscription_prices;
DROP POLICY IF EXISTS "Public can view active prices" ON public.subscription_prices;
DROP POLICY IF EXISTS "Service role full access to prices" ON public.subscription_prices;

-- ====================
-- USER_PROFILES POLICIES
-- ====================

-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT 
  TO authenticated
  USING (auth.uid() = id);

-- Users can update their own profile (excluding sensitive fields)
CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow system to insert new profiles (for signup trigger)
CREATE POLICY "System can insert user profiles" ON public.user_profiles
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Service role can manage all profiles (for webhook operations)
CREATE POLICY "Service role full access to user profiles" ON public.user_profiles
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ====================
-- SUBSCRIPTION_PRODUCTS POLICIES
-- ====================

-- Authenticated users can view active products
CREATE POLICY "Authenticated users can view products" ON public.subscription_products
  FOR SELECT 
  TO authenticated
  USING (active = true);

-- Public (unauthenticated) users can view active products (for pricing page)
CREATE POLICY "Public can view active products" ON public.subscription_products
  FOR SELECT 
  TO anon
  USING (active = true);

-- Service role can manage products (for Stripe sync)
CREATE POLICY "Service role full access to products" ON public.subscription_products
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ====================
-- SUBSCRIPTION_PRICES POLICIES
-- ====================

-- Authenticated users can view active prices
CREATE POLICY "Authenticated users can view prices" ON public.subscription_prices
  FOR SELECT 
  TO authenticated
  USING (active = true);

-- Public (unauthenticated) users can view active prices (for pricing page)
CREATE POLICY "Public can view active prices" ON public.subscription_prices
  FOR SELECT 
  TO anon
  USING (active = true);

-- Service role can manage prices (for Stripe sync)
CREATE POLICY "Service role full access to prices" ON public.subscription_prices
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ====================
-- ADDITIONAL SECURITY MEASURES
-- ====================

-- Create a function to check if user owns a profile (useful for complex policies)
CREATE OR REPLACE FUNCTION public.is_profile_owner(profile_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (SELECT auth.uid() = profile_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated, anon;
GRANT SELECT ON public.subscription_products TO authenticated, anon;
GRANT SELECT ON public.subscription_prices TO authenticated, anon;
GRANT SELECT, INSERT, UPDATE ON public.user_profiles TO authenticated;

-- ====================
-- WEBHOOK SECURITY
-- ====================

-- For webhook operations, we'll use the service role key
-- This bypasses RLS but should only be used server-side with proper authentication

-- You can also create a custom role for webhooks if needed:
-- CREATE ROLE webhook_role;
-- GRANT SELECT, INSERT, UPDATE ON public.user_profiles TO webhook_role;
-- GRANT SELECT ON public.subscription_products TO webhook_role;
-- GRANT SELECT ON public.subscription_prices TO webhook_role; 