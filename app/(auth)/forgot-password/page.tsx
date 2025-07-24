import { forgotPasswordAction } from "@/app/actions";
import AuthSubmitButton from "@/components/auth-submit-button";
import { FormMessage, Message } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ForgotPassword(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  
  // Convert searchParams to Message format
  const message: Message | Record<string, never> = searchParams.error 
    ? { error: Array.isArray(searchParams.error) ? searchParams.error[0] : searchParams.error }
    : searchParams.success
    ? { success: Array.isArray(searchParams.success) ? searchParams.success[0] : searchParams.success }
    : searchParams.message
    ? { message: Array.isArray(searchParams.message) ? searchParams.message[0] : searchParams.message }
    : {};

  // If there's a success message (reset email sent), show confirmation screen
  if ("success" in message) {
    return (
      <div className="flex-1 flex flex-col w-full max-w-md mx-auto mt-24">
        <div className="text-center space-y-6">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          {/* Main Message */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-primary">Check Your Email</h1>
            <p className="text-muted-foreground">
              We've sent you a password reset link
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left space-y-3">
            <h3 className="font-medium text-blue-800">Next Steps:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-700">
              <li>Check your email inbox for a message from CoreBrief</li>
              <li>Click the "Reset Password" link in the email</li>
              <li>Enter your new password</li>
              <li>Sign in with your new password</li>
            </ol>
            
            <div className="pt-3 border-t border-blue-200">
              <p className="text-xs text-blue-600">
                <strong>Don't see the email?</strong> Check your spam folder. The link will expire in 1 hour.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/sign-in">
                Back to Sign In
              </Link>
            </Button>
            
            <div className="pt-2">
              <Link 
                href="/forgot-password" 
                className="text-sm text-primary hover:underline"
              >
                ← Try a different email address
              </Link>
            </div>
          </div>

          {/* Support */}
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

  // Show forgot password form
  return (
    <form
      className="flex-1 flex flex-col w-full max-w-sm mx-auto mt-24"
      action={forgotPasswordAction}
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-medium mb-2">Forgot Password?</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>
      
      <div className="flex flex-col gap-2 [&>input]:mb-3">
        {/* Show error messages if any */}
        {("error" in message || "message" in message) && (
          <FormMessage message={message} />
        )}
        
        <Label htmlFor="email">Email Address</Label>
        <Input 
          name="email" 
          type="email"
          placeholder="you@company.com" 
          required 
          autoFocus
        />
        
        <AuthSubmitButton pendingText="Sending reset link...">
          Send Reset Link
        </AuthSubmitButton>
        
        {/* Navigation Links */}
        <div className="flex flex-col items-center gap-2 mt-6 pt-6 border-t text-sm">
          <Link 
            href="/sign-in" 
            className="text-primary hover:underline"
          >
            ← Back to Sign In
          </Link>
          <div className="text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
} 