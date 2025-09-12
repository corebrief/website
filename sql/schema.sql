-- Create users table extension for subscription data
-- This extends the default Supabase auth.users table with subscription info

-- Create a custom users table that references auth.users
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  
  -- Organization/Professional Info
  organization_name TEXT,
  organization_type TEXT CHECK (organization_type IN ('family_office', 'ria', 'asset_manager', 'individual', 'other')),
  role_title TEXT,
  aum_range TEXT CHECK (aum_range IN ('under_10m', '10m_50m', '50m_250m', '250m_1b', 'over_1b', 'prefer_not_to_say')),
  phone_number TEXT,
  
  -- Investment Profile
  primary_asset_classes TEXT[], -- Array of asset class interests
  investment_focus TEXT CHECK (investment_focus IN ('conservative_income', 'growth', 'balanced', 'value', 'other')),
  current_research_providers TEXT,
  referral_source TEXT,
  
  -- Subscription fields
  stripe_customer_id TEXT UNIQUE,
  subscription_id TEXT,
  subscription_status TEXT CHECK (subscription_status IN ('active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'trialing', 'unpaid')),
  subscription_plan_id TEXT,
  subscription_current_period_start TIMESTAMPTZ,
  subscription_current_period_end TIMESTAMPTZ,
  subscription_cancel_at_period_end BOOLEAN DEFAULT FALSE,
  
  -- Entitlements
  has_paid BOOLEAN DEFAULT FALSE,
  entitlements JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create subscription products table
CREATE TABLE public.subscription_products (
  id TEXT PRIMARY KEY,
  stripe_product_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create subscription prices table  
CREATE TABLE public.subscription_prices (
  id TEXT PRIMARY KEY,
  stripe_price_id TEXT UNIQUE NOT NULL,
  product_id TEXT REFERENCES public.subscription_products(id),
  currency TEXT NOT NULL DEFAULT 'usd',
  unit_amount INTEGER,
  interval_type TEXT CHECK (interval_type IN ('month', 'year', 'one_time')),
  interval_count INTEGER DEFAULT 1,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_prices ENABLE ROW LEVEL SECURITY;

-- Create policies for user_profiles
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create policies for products and prices (readable by authenticated users)
CREATE POLICY "Anyone can view products" ON public.subscription_products
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view prices" ON public.subscription_prices
  FOR SELECT USING (true);

-- Create function to handle user profile creation
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
    referral_source
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
    NEW.raw_user_meta_data->>'referral_source'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Create trigger to automatically create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Create triggers for updated_at
CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.subscription_products
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.subscription_prices
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at(); 