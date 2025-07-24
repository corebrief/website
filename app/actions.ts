"use server";

import { createSupabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { encodedRedirect } from "@/utils/redirect";

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const client = await createSupabaseClient();

  const { error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("full_name") as string;
  
  // Organization information
  const organizationName = formData.get("organization_name") as string;
  const organizationType = formData.get("organization_type") as string;
  const roleTitle = formData.get("role_title") as string;
  const aumRange = formData.get("aum_range") as string;
  const phoneNumber = formData.get("phone_number") as string;
  
  // Investment profile
  const investmentFocus = formData.get("investment_focus") as string;
  const primaryAssetClasses = formData.get("primary_asset_classes") as string;
  const currentResearchProviders = formData.get("current_research_providers") as string;
  const referralSource = formData.get("referral_source") as string;
  const referralCode = formData.get("referral_code") as string;
  
  // Privacy preferences
  const marketingConsent = formData.get("marketing_consent") === "on";
  
  // Basic validation - check required fields
  if (!email || !password || !fullName || !organizationName || !organizationType || !roleTitle) {
    return encodedRedirect("error", "/sign-up", "Please fill in all required fields (marked with *)");
  }

  const client = await createSupabaseClient();

  const url = process.env.VERCEL_URL
    ? `${process.env.VERCEL_URL}/protected`
    : "http://localhost:3000/protected";

  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: url,
      data: {
        full_name: fullName,
        organization_name: organizationName,
        organization_type: organizationType,
        role_title: roleTitle,
        aum_range: aumRange || null,
        phone_number: phoneNumber || null,
        investment_focus: investmentFocus || null,
        primary_asset_classes: primaryAssetClasses ? primaryAssetClasses.split(',').map(s => s.trim()).filter(s => s) : [],
        current_research_providers: currentResearchProviders || null,
        referral_source: referralSource || null,
        referral_code: referralCode || null,
        marketing_consent: marketingConsent,
        communication_preferences: {
          email_updates: true,
          research_reports: true,
          marketing: marketingConsent
        }
      },
    },
  });

  if (error) {
    console.error("Sign-up error:", error);
    return encodedRedirect("error", "/sign-up", error.message);
  }

  // If email confirmation is disabled, redirect to protected
  // If email confirmation is enabled, show success message
  if (data.user && !data.user.email_confirmed_at) {
    return encodedRedirect("success", "/sign-up", "Please check your email to confirm your account");
  }

  return redirect("/protected");
};

export const signOutAction = async () => {
  const client = await createSupabaseClient();
  await client.auth.signOut();
  return redirect("/sign-in");
};
