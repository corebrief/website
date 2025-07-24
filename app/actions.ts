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
  
  if (!email || !password) {
    return encodedRedirect("error", "/sign-up", "Email and password are required");
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
