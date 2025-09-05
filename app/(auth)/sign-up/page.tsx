import { signUpAction } from "@/app/actions";
import AuthSubmitButton from "@/components/auth-submit-button";
import { FormMessage, Message } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function SignUp(props: {
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

  // If there's a success message (email confirmation sent), show confirmation screen
  if ("success" in message) {
    return (
      <div className="flex-1 flex flex-col w-full max-w-lg mx-auto mt-16 mb-16">
        <div className="text-center space-y-6">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Main Message */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-primary">Check Your Email</h1>
                         <p className="text-lg text-muted-foreground">
               We&apos;ve sent you a confirmation email
             </p>
          </div>

          {/* Instructions */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-4">
            <div className="text-left space-y-3">
              <h3 className="font-medium text-green-800">Next Steps:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-green-700">
                <li>Check your email inbox for a message from CoreBrief</li>
                <li>Click the confirmation link in the email</li>
                                 <li>You&apos;ll be redirected to your account dashboard</li>
              </ol>
            </div>
            
            <div className="pt-3 border-t border-green-200">
              <p className="text-xs text-green-600">
                                 <strong>Don&apos;t see the email?</strong> Check your spam folder or wait a few minutes. 
                The email should arrive within 5 minutes.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">
              Already confirmed your email?
            </div>
            <Button asChild className="w-full">
              <Link href="/sign-in">
                Sign In to Your Account
              </Link>
            </Button>
            
            <div className="pt-4">
              <Link 
                href="/sign-up" 
                className="text-sm text-primary hover:underline"
              >
                ← Need to sign up with a different email?
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="pt-6 border-t text-xs text-muted-foreground">
            Having trouble? Contact us at{" "}
            <a href="mailto:support@corebrief.ai" className="text-primary hover:underline">
              support@corebrief.ai
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Show regular signup form if no success message
  return (
    <form
      className="flex-1 flex flex-col w-full max-w-lg mx-auto mt-16 mb-16"
      action={signUpAction}
    >
      <h1 className="text-2xl font-medium mb-2">Sign Up for Early Access</h1>
      <p className="text-sm text-foreground mb-8">
        Create your account to join the early access waitlist. After signing up, you can submit your waitlist request.{" "}
        <Link className="text-foreground font-medium underline" href="/sign-in">
          Already have an account?
        </Link>
      </p>
      
      <div className="space-y-6">
        {/* Show error messages if any */}
        {("error" in message || "message" in message) && (
          <FormMessage message={message} />
        )}

        {/* Research Tool Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <strong>Research Tool Only:</strong> CoreBrief provides research and analysis tools for professionals. 
              We do not provide investment advice, recommendations, or personalized guidance. 
              This information helps us customize your research dashboard experience.
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="full_name">Full Name *</Label>
              <Input name="full_name" placeholder="Your full name" required />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input name="email" type="email" placeholder="you@company.com" required />
            </div>
          </div>
          
          <div>
            <Label htmlFor="password">Password *</Label>
            <Input 
              type="password" 
              name="password" 
              placeholder="Create password" 
              required 
              minLength={8}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              title="Password must be at least 8 characters and include: uppercase letter, lowercase letter, number, and special character"
            />
            <p className="text-xs text-muted-foreground mt-1">
              At least 8 characters with uppercase, lowercase, number, and special character
            </p>
          </div>
        </div>

        {/* Organization Information */}
        <div className="space-y-4">
          
          <div>
            <Label htmlFor="organization_name">Organization Name</Label>
            <Input name="organization_name" placeholder="Your company/firm name (or leave blank if individual)" />
            <p className="text-xs text-muted-foreground mt-1">Optional for individual professionals</p>
          </div>
          
          <div>
            <Label htmlFor="organization_type">Organization Type *</Label>
            <select 
              name="organization_type" 
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">Select type</option>
              <option value="individual_investor">Individual Professional</option>
              <option value="financial_advisor">Financial Advisor</option>
              <option value="family_office">Family Office</option>
              <option value="ria">RIA (Registered Investment Advisor)</option>
              <option value="asset_manager">Asset Manager</option>
              <option value="hedge_fund">Hedge Fund</option>
              <option value="other">Other</option>
            </select>
          </div>
          
        </div>

        {/* Referral Information */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="referral_source">How did you hear about us?</Label>
                          <select 
                name="referral_source"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Select source</option>
                <option value="google">Google Search</option>
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter/X</option>
                <option value="social_media">Other Social Media</option>
                <option value="partner_referral">Partner/Integration</option>
                <option value="professional_referral">Professional Referral</option>
                <option value="direct">Direct/Website</option>
                <option value="other">Other</option>
              </select>
          </div>
          
          <div>
            <Label htmlFor="referral_code">Referral Code (Optional)</Label>
            <Input 
              name="referral_code" 
              placeholder="Enter referral code if you have one" 
            />
          </div>
        </div>

        {/* Consent & Confirmation */}
        <div className="border-t pt-6 space-y-4">
          {/* Professional Use Confirmation - Required */}
          <div className="flex items-start space-x-3">
            <input 
              type="checkbox" 
              name="professional_use" 
              id="professional_use"
              required
              className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="professional_use" className="text-sm text-muted-foreground leading-relaxed">
              I confirm this account is for professional research purposes and understand that CoreBrief provides 
              analytical tools, not investment advice. *
            </label>
          </div>

          {/* Marketing Consent - Optional */}
          <div className="flex items-start space-x-3">
            <input 
              type="checkbox" 
              name="marketing_consent" 
              id="marketing_consent"
              className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="marketing_consent" className="text-sm text-muted-foreground leading-relaxed">
              I consent to receive marketing communications, product updates, and industry insights from CoreBrief. 
              You can withdraw this consent at any time through your account settings or by contacting us.
            </label>
          </div>

          {/* Terms & Privacy Agreement - Required */}
          <div className="flex items-start space-x-3 pt-2 border-t">
            <input 
              type="checkbox" 
              name="terms_agreement" 
              id="terms_agreement"
              required
              className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="terms_agreement" className="text-sm text-muted-foreground leading-relaxed">
              I agree to the{" "}
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and{" "}
              <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>. *
            </label>
          </div>
        </div>

        <AuthSubmitButton pendingText="Creating account...">
          Create Account
        </AuthSubmitButton>
      </div>
    </form>
  );
}
