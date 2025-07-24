"use server";

import { createSupabaseClient } from "@/utils/supabase/server";

export async function submitWaitlistRequest(formData: FormData) {
  try {
    const client = await createSupabaseClient();
    const { data: { user }, error: userError } = await client.auth.getUser();
    
    if (userError || !user) {
      return { error: 'User not authenticated' };
    }

    // Extract form data
    const requestType = formData.get("request_type") as string;
    const priorityLevel = formData.get("priority_level") as string;
    const useCaseDescription = formData.get("use_case_description") as string;
    const timelineUrgency = formData.get("timeline_urgency") as string;
    const budgetRange = formData.get("budget_range") as string;
    const teamSize = formData.get("team_size") as string;
    const currentTools = formData.get("current_tools") as string;
    
    // Get all selected features
    const requestedFeatures = formData.getAll("requested_features") as string[];

    // Validate required fields
    if (!requestType || !priorityLevel || !useCaseDescription) {
      return { error: 'Please fill in all required fields' };
    }

    // Insert waitlist request
    const { error: insertError } = await client
      .from('waitlist_requests')
      .insert({
        user_id: user.id,
        request_type: requestType,
        priority_level: priorityLevel,
        use_case_description: useCaseDescription,
        timeline_urgency: timelineUrgency || null,
        budget_range: budgetRange || null,
        team_size: teamSize ? parseInt(teamSize.replace(/[^0-9]/g, '')) || null : null,
        current_tools: currentTools ? currentTools.split(',').map(s => s.trim()).filter(s => s) : [],
        requested_features: requestedFeatures || [],
        status: 'pending'
      });

    if (insertError) {
      console.error('Waitlist request insert error:', insertError);
      return { error: 'Failed to submit waitlist request' };
    }

    // Update user profile to mark as early access requested
    const { error: updateError } = await client
      .from('user_profiles')
      .update({
        early_access_requested: true,
        waitlist_status: 'pending'
      })
      .eq('id', user.id);

    if (updateError) {
      console.error('Profile update error:', updateError);
      // Don't fail the request if profile update fails
    }

    // TODO: Send notification email to admin
    // TODO: Send confirmation email to user

    return { success: true };
  } catch (error) {
    console.error('Waitlist request error:', error);
    return { error: 'An unexpected error occurred' };
  }
}

export async function getWaitlistStatus(userId: string) {
  try {
    const client = await createSupabaseClient();
    
    // Get user profile with waitlist info
    const { data: profile, error: profileError } = await client
      .from('user_profiles')
      .select(`
        waitlist_status,
        waitlist_position,
        waitlist_joined_at,
        early_access_requested,
        early_access_granted,
        early_access_granted_at
      `)
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      return { error: 'Failed to fetch waitlist status' };
    }

    // Get waitlist requests
    const { data: requests, error: requestsError } = await client
      .from('waitlist_requests')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (requestsError) {
      console.error('Requests fetch error:', requestsError);
      return { error: 'Failed to fetch waitlist requests' };
    }

    return { 
      profile,
      requests: requests || []
    };
  } catch (error) {
    console.error('Waitlist status error:', error);
    return { error: 'An unexpected error occurred' };
  }
}

export async function updateWaitlistPreferences(preferences: {
  requestType: string;
  priorityLevel: string;
  budgetRange?: string;
}) {
  try {
    const client = await createSupabaseClient();
    const { data: { user }, error: userError } = await client.auth.getUser();
    
    if (userError || !user) {
      return { error: 'User not authenticated' };
    }

    // Update the most recent waitlist request
    const { error } = await client
      .from('waitlist_requests')
      .update({
        request_type: preferences.requestType,
        priority_level: preferences.priorityLevel,
        budget_range: preferences.budgetRange || null,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Waitlist update error:', error);
      return { error: 'Failed to update waitlist preferences' };
    }

    return { success: true };
  } catch (error) {
    console.error('Waitlist preferences error:', error);
    return { error: 'An unexpected error occurred' };
  }
} 