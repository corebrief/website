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

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const client = await createSupabaseClient();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  // Use the same URL logic as signup
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
                  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
                  "http://localhost:3000";
  
  const { error } = await client.auth.resetPasswordForEmail(email, {
    redirectTo: `${baseUrl}/reset-password`,
  });

  if (error) {
    console.error("Password reset error:", error);
    return encodedRedirect("error", "/forgot-password", "Failed to send reset email. Please try again.");
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a password reset link"
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const client = await createSupabaseClient();

  if (!password || !confirmPassword) {
    return encodedRedirect("error", "/reset-password", "Both password fields are required");
  }

  if (password !== confirmPassword) {
    return encodedRedirect("error", "/reset-password", "Passwords do not match");
  }

  if (password.length < 6) {
    return encodedRedirect("error", "/reset-password", "Password must be at least 6 characters");
  }

  const { error } = await client.auth.updateUser({
    password: password
  });

  if (error) {
    console.error("Password update error:", error);
    return encodedRedirect("error", "/reset-password", "Failed to update password. Please try again.");
  }

  return encodedRedirect("success", "/sign-in", "Password updated successfully. Please sign in with your new password.");
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

  // Try multiple sources for the production URL
  const url = process.env.NEXT_PUBLIC_APP_URL || 
               (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
               "http://localhost:3000";
  
  const redirectUrl = `${url}/protected`;
  
  // Debug logging to see what URL is being used
  console.log("Email redirect URL:", redirectUrl);
  console.log("VERCEL_URL:", process.env.VERCEL_URL);
  console.log("NEXT_PUBLIC_APP_URL:", process.env.NEXT_PUBLIC_APP_URL);

  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectUrl,
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
    
    // Handle case where user already exists but hasn't confirmed email
    if (error.message?.includes("User already registered")) {
      // Attempt to resend confirmation email
      try {
        await client.auth.resend({
          type: 'signup',
          email: email,
          options: {
            emailRedirectTo: redirectUrl
          }
        });
        
        console.log("Resent confirmation email to:", email);
        return encodedRedirect("success", "/sign-up", "A new confirmation email has been sent. Please check your email to confirm your account");
      } catch (resendError) {
        console.error("Error resending confirmation:", resendError);
        return encodedRedirect("success", "/sign-up", "Please check your email for the confirmation link. If you don't see it, check your spam folder");
      }
    }
    
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
