"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseClient } from "@/utils/supabase/client";
import { FormMessage, Message } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isValidSession, setIsValidSession] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Convert searchParams to Message format for form errors
  const formMessage: Message | Record<string, never> = searchParams.get("error")
    ? { error: searchParams.get("error")! }
    : searchParams.get("success")
    ? { success: searchParams.get("success")! }
    : searchParams.get("message")
    ? { message: searchParams.get("message")! }
    : {};

  useEffect(() => {
    const handlePasswordReset = async () => {
      const supabase = createSupabaseClient();
      
      try {
        // Get the current session to see if we have a valid reset session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          setError("Invalid or expired reset link. Please request a new password reset.");
          setIsLoading(false);
          return;
        }

        if (!session) {
          setError("Invalid or expired reset link. Please request a new password reset.");
          setIsLoading(false);
          return;
        }

        // If we have a session, we can proceed with the password reset
        setIsValidSession(true);
        setIsLoading(false);
        
      } catch (err) {
        console.error("Error handling password reset:", err);
        setError("Something went wrong. Please try requesting a new password reset.");
        setIsLoading(false);
      }
    };

    handlePasswordReset();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col w-full max-w-sm mx-auto mt-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  if (error || !isValidSession) {
    return (
      <div className="flex-1 flex flex-col w-full max-w-sm mx-auto mt-24">
        <div className="text-center space-y-6">
          {/* Error Icon */}
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-primary">Reset Link Invalid</h1>
            <p className="text-muted-foreground">
              {error || "This password reset link is invalid or has expired."}
            </p>
          </div>

          <div className="space-y-3">
            <Link 
              href="/forgot-password"
              className="inline-block w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md text-center transition-colors"
            >
              Request New Reset Link
            </Link>
            
            <Link 
              href="/sign-in" 
              className="block text-sm text-primary hover:underline"
            >
              ← Back to Sign In
            </Link>
          </div>

          <div className="pt-6 border-t text-xs text-muted-foreground">
            Need help? Contact us at{" "}
            <a href="mailto:support@corebrief.ai" className="text-primary hover:underline">
              support@corebrief.ai
            </a>
          </div>
        </div>
      </div>
    );
  }

  const handlePasswordUpdate = async (formData: FormData) => {
    setIsUpdating(true);
    setUpdateError(null);

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Client-side validation
    if (!password || !confirmPassword) {
      setUpdateError("Both password fields are required");
      setIsUpdating(false);
      return;
    }

    if (password !== confirmPassword) {
      setUpdateError("Passwords do not match");
      setIsUpdating(false);
      return;
    }

    if (password.length < 6) {
      setUpdateError("Password must be at least 6 characters");
      setIsUpdating(false);
      return;
    }

    try {
      const supabase = createSupabaseClient();
      
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        console.error("Password update error:", error);
        setUpdateError("Failed to update password. Please try again.");
        setIsUpdating(false);
        return;
      }

      // Success - redirect to sign in with success message
      router.push("/sign-in?success=Password updated successfully. Please sign in with your new password.");
      
    } catch (err) {
      console.error("Password update error:", err);
      setUpdateError("Something went wrong. Please try again.");
      setIsUpdating(false);
    }
  };

  return (
    <form
      className="flex-1 flex flex-col w-full max-w-sm mx-auto mt-24"
      action={handlePasswordUpdate}
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-medium mb-2">Reset Your Password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your new password below. Make sure it&apos;s secure and memorable.
        </p>
      </div>
      
      <div className="flex flex-col gap-2 [&>input]:mb-3">
        {/* Show update errors */}
        {updateError && (
          <div className="text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3 mb-2">
            ⚠ {updateError}
          </div>
        )}
        
        {/* Show form messages (from URL params) */}
        {("error" in formMessage || "success" in formMessage || "message" in formMessage) && (
          <FormMessage message={formMessage} />
        )}
        
        <Label htmlFor="password">New Password</Label>
        <Input 
          name="password" 
          type="password"
          placeholder="Enter new password"
          required 
          minLength={6}
          autoFocus
          disabled={isUpdating}
        />
        
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <Input 
          name="confirmPassword" 
          type="password"
          placeholder="Confirm new password"
          required 
          minLength={6}
          disabled={isUpdating}
        />
        
        <div className="text-xs text-muted-foreground mb-4">
          Password must be at least 6 characters long
        </div>
        
        <button
          type="submit"
          disabled={isUpdating}
          className="flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {isUpdating ? "Updating password..." : "Update Password"}
        </button>
        
        {/* Navigation Links */}
        <div className="flex flex-col items-center gap-2 mt-6 pt-6 border-t text-sm">
          <Link 
            href="/sign-in" 
            className="text-primary hover:underline"
          >
            ← Back to Sign In
          </Link>
          <div className="text-muted-foreground">
            Remember your password?{" "}
            <Link href="/sign-in" className="text-primary hover:underline">
              Sign in instead
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
} 