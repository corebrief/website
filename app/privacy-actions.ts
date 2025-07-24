"use server";

import { createSupabaseClient } from "@/utils/supabase/server";

export async function updatePrivacyPreferences(preferences: {
  email_updates: boolean;
  research_reports: boolean;
  marketing: boolean;
}) {
  try {
    const client = await createSupabaseClient();
    const { data: { user }, error: userError } = await client.auth.getUser();
    
    if (userError || !user) {
      return { error: 'User not authenticated' };
    }

    const { error } = await client
      .from('user_profiles')
      .update({
        marketing_consent: preferences.marketing,
        marketing_consent_date: preferences.marketing ? new Date().toISOString() : null,
        communication_preferences: {
          email_updates: preferences.email_updates,
          research_reports: preferences.research_reports,
          marketing: preferences.marketing
        }
      })
      .eq('id', user.id);

    if (error) {
      console.error('Privacy preferences update error:', error);
      return { error: 'Failed to update preferences' };
    }

    return { success: true };
  } catch (error) {
    console.error('Privacy preferences error:', error);
    return { error: 'An unexpected error occurred' };
  }
}

export async function exportUserData() {
  try {
    const client = await createSupabaseClient();
    const { data: { user }, error: userError } = await client.auth.getUser();
    
    if (userError || !user) {
      return { error: 'User not authenticated' };
    }

    // Fetch user profile data
    const { data: profile, error: profileError } = await client
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      return { error: 'Failed to fetch user data' };
    }

    // Fetch privacy request history
    const { data: privacyRequests } = await client
      .from('privacy_requests')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    // Create export data structure
    const exportData = {
      export_info: {
        generated_at: new Date().toISOString(),
        user_id: user.id,
        export_type: 'complete_user_data'
      },
      account_info: {
        email: user.email,
        created_at: user.created_at,
        last_sign_in_at: user.last_sign_in_at,
        email_confirmed_at: user.email_confirmed_at
      },
      profile_data: {
        full_name: profile?.full_name,
        phone_number: profile?.phone_number,
        organization_name: profile?.organization_name,
        organization_type: profile?.organization_type,
        role_title: profile?.role_title,
        aum_range: profile?.aum_range,
        investment_focus: profile?.investment_focus,
        primary_asset_classes: profile?.primary_asset_classes,
        current_research_providers: profile?.current_research_providers,
        referral_source: profile?.referral_source,
        referral_code: profile?.referral_code
      },
      privacy_preferences: {
        marketing_consent: profile?.marketing_consent,
        marketing_consent_date: profile?.marketing_consent_date,
        communication_preferences: profile?.communication_preferences,
        cookie_consent: profile?.cookie_consent
      },
      privacy_request_history: privacyRequests || [],
      subscription_info: {
        stripe_customer_id: profile?.stripe_customer_id,
        subscription_status: profile?.subscription_status,
        subscription_plan_id: profile?.subscription_plan_id,
        has_paid: profile?.has_paid
      }
    };

    // Log the export request
    await client
      .from('privacy_requests')
      .insert({
        user_id: user.id,
        request_type: 'data_export',
        status: 'completed',
        completed_at: new Date().toISOString(),
        notes: 'Self-service data export via privacy dashboard'
      });

    return { data: exportData };
  } catch (error) {
    console.error('Data export error:', error);
    return { error: 'An unexpected error occurred during export' };
  }
}

export async function requestAccountDeletion(reason?: string) {
  try {
    const client = await createSupabaseClient();
    const { data: { user }, error: userError } = await client.auth.getUser();
    
    if (userError || !user) {
      return { error: 'User not authenticated' };
    }

    // Create deletion request
    const { error } = await client
      .from('privacy_requests')
      .insert({
        user_id: user.id,
        request_type: 'data_deletion',
        status: 'pending',
        request_details: { reason: reason || 'User requested account deletion' },
        notes: 'Account deletion requested via privacy dashboard'
      });

    if (error) {
      console.error('Deletion request error:', error);
      return { error: 'Failed to submit deletion request' };
    }

    return { success: true };
  } catch (error) {
    console.error('Account deletion error:', error);
    return { error: 'An unexpected error occurred' };
  }
} 