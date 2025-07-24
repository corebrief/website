import { createSupabaseClient } from './server';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  stripe_customer_id: string | null;
  subscription_id: string | null;
  subscription_status: string | null;
  subscription_plan_id: string | null;
  subscription_current_period_start: string | null;
  subscription_current_period_end: string | null;
  subscription_cancel_at_period_end: boolean;
  has_paid: boolean;
  entitlements: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface EntitlementCheckResult {
  hasAccess: boolean;
  reason?: string;
}

export async function checkEntitlement(entitlement: string): Promise<{ data: EntitlementCheckResult | null; error: Error | null }> {
  try {
    const supabase = await createSupabaseClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return {
        data: { hasAccess: false, reason: 'User not authenticated' },
        error: null
      };
    }

    // Get user profile with subscription data
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return {
        data: { hasAccess: false, reason: 'User profile not found' },
        error: null
      };
    }

    // Check entitlement based on subscription status and specific entitlement
    const hasActiveSubscription = profile.subscription_status === 'active' && 
                                   profile.subscription_current_period_end && 
                                   new Date(profile.subscription_current_period_end) > new Date();

    let hasAccess = false;

    switch (entitlement) {
      case 'premium':
        hasAccess = hasActiveSubscription || profile.has_paid;
        break;
      default:
        // Check if specific entitlement exists in entitlements JSON
        hasAccess = profile.entitlements[entitlement] === true;
    }

    return {
      data: { 
        hasAccess,
        reason: hasAccess ? 'Access granted' : 'No active subscription or entitlement'
      },
      error: null
    };
  } catch (error) {
    return {
      data: null,
      error: error as Error
    };
  }
}

export async function getUserProfile(): Promise<{ data: UserProfile | null; error: Error | null }> {
  try {
    const supabase = await createSupabaseClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return { data: null, error: new Error('User not authenticated') };
    }

    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      return { data: null, error: profileError };
    }

    return { data: profile, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function updateUserProfile(updates: Partial<UserProfile>): Promise<{ data: UserProfile | null; error: Error | null }> {
  try {
    const supabase = await createSupabaseClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return { data: null, error: new Error('User not authenticated') };
    }

    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (profileError) {
      return { data: null, error: profileError };
    }

    return { data: profile, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
} 