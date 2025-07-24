import { signUpAction } from "@/app/actions";
import AuthSubmitButton from "@/components/auth-submit-button";
import { FormMessage, Message } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  return (
    <form
      className="flex-1 flex flex-col w-full max-w-lg mx-auto mt-16 mb-16"
      action={signUpAction}
    >
      <h1 className="text-2xl font-medium mb-2">Request Alpha Access</h1>
      <p className="text-sm text-foreground mb-8">
        Join select family offices and RIAs using CoreBrief for institutional-quality analysis.{" "}
        <Link className="text-foreground font-medium underline" href="/sign-in">
          Already have access?
        </Link>
      </p>
      
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-primary border-b pb-2">Contact Information</h3>
          
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input name="phone_number" type="tel" placeholder="+1 (555) 123-4567" />
            </div>
            <div>
              <Label htmlFor="password">Password *</Label>
              <Input type="password" name="password" placeholder="Create password" required />
            </div>
          </div>
        </div>

        {/* Organization Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-primary border-b pb-2">Organization</h3>
          
          <div>
            <Label htmlFor="organization_name">Organization Name *</Label>
            <Input name="organization_name" placeholder="Acme Family Office" required />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="organization_type">Organization Type *</Label>
              <select 
                name="organization_type" 
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Select type</option>
                <option value="family_office">Family Office</option>
                <option value="ria">RIA (Registered Investment Advisor)</option>
                <option value="asset_manager">Asset Manager</option>
                <option value="individual">Individual Investor</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <Label htmlFor="role_title">Your Role/Title *</Label>
              <Input name="role_title" placeholder="Chief Investment Officer" required />
            </div>
          </div>
          
          <div>
            <Label htmlFor="aum_range">Assets Under Management</Label>
            <select 
              name="aum_range"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">Select AUM range</option>
              <option value="under_10m">Under $10M</option>
              <option value="10m_50m">$10M - $50M</option>
              <option value="50m_250m">$50M - $250M</option>
              <option value="250m_1b">$250M - $1B</option>
              <option value="over_1b">Over $1B</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>
        </div>

        {/* Investment Profile */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-primary border-b pb-2">Investment Profile</h3>
          
          <div>
            <Label htmlFor="investment_focus">Primary Investment Focus</Label>
            <select 
              name="investment_focus"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">Select focus</option>
              <option value="conservative_income">Conservative Income</option>
              <option value="balanced">Balanced</option>
              <option value="growth">Growth</option>
              <option value="value">Value</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="primary_asset_classes">Asset Classes of Interest</Label>
            <Input 
              name="primary_asset_classes" 
              placeholder="e.g., Dividend Stocks, REITs, MLPs, Fixed Income" 
            />
          </div>
          
          <div>
            <Label htmlFor="current_research_providers">Current Research Providers</Label>
            <Input 
              name="current_research_providers" 
              placeholder="e.g., Bloomberg, FactSet, Morningstar, Internal Team" 
            />
          </div>
          
          <div>
            <Label htmlFor="referral_source">How did you hear about us?</Label>
            <select 
              name="referral_source"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">Select source</option>
              <option value="google">Google Search</option>
              <option value="linkedin">LinkedIn</option>
              <option value="referral">Professional Referral</option>
              <option value="conference">Industry Conference</option>
              <option value="newsletter">Newsletter/Publication</option>
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

        <AuthSubmitButton pendingText="Submitting request...">
          Request Alpha Access
        </AuthSubmitButton>
        
        {/* Marketing Consent */}
        <div className="border-t pt-4">
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
          <p className="text-xs text-muted-foreground mt-2">
            By submitting this form, you agree to our{" "}
            <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and{" "}
            <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>.
          </p>
        </div>
        
        <FormMessage message={message} />
      </div>
    </form>
  );
}
