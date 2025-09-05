import { createSupabaseClient } from "@/utils/supabase/server";
import AuthPageSignOutButton from "@/components/auth-sign-out-button";
import Link from "next/link";

export default async function ProtectedPage() {
  const client = await createSupabaseClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    return (
      <div>There was an error loading your account. Please try again.</div>
    );
  }

  // Fetch user profile data
  const { data: profile } = await client
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Helper function to display field or "Not provided"
  const displayField = (value: string | null | undefined) => {
    return value || <span className="text-muted-foreground italic">Not provided</span>;
  };

  // Helper function to format organization type
  const formatOrgType = (type: string | null) => {
    if (!type) return "Not provided";
    const typeMap: Record<string, string> = {
      'individual_investor': 'Individual Professional',
      'financial_advisor': 'Financial Advisor',
      'family_office': 'Family Office',
      'ria': 'RIA (Registered Investment Advisor)',
      'asset_manager': 'Asset Manager',
      'hedge_fund': 'Hedge Fund',
      'other': 'Other'
    };
    return typeMap[type] || type;
  };

  // Helper function to format referral source
  const formatReferralSource = (source: string | null) => {
    if (!source) return "Not provided";
    const sourceMap: Record<string, string> = {
      'google': 'Google Search',
      'linkedin': 'LinkedIn',
      'twitter': 'Twitter/X',
      'social_media': 'Other Social Media',
      'partner_referral': 'Partner/Integration',
      'professional_referral': 'Professional Referral',
      'direct': 'Direct/Website',
      'other': 'Other'
    };
    return sourceMap[source] || source;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium">Account</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and profile information
          </p>
        </div>
        <AuthPageSignOutButton />
      </div>

      <div className="space-y-6">
        {/* Contact Information */}
        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="font-medium text-lg text-primary border-b pb-2">Contact Information</h2>
          <div className="grid gap-3 text-sm">
            <div className="grid grid-cols-[140px_1fr]">
              <div className="text-muted-foreground">Full Name</div>
              <div>{displayField(profile?.full_name)}</div>  
            </div>
            <div className="grid grid-cols-[140px_1fr]">
              <div className="text-muted-foreground">Email</div>
              <div>{user?.email}</div>
            </div>
          </div>
        </div>

        {/* Organization Information */}
        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="font-medium text-lg text-primary border-b pb-2">Organization</h2>
          <div className="grid gap-3 text-sm">
            <div className="grid grid-cols-[140px_1fr]">
              <div className="text-muted-foreground">Organization Name</div>
              <div>{displayField(profile?.organization_name)}</div>
            </div>
            <div className="grid grid-cols-[140px_1fr]">
              <div className="text-muted-foreground">Organization Type</div>
              <div>{formatOrgType(profile?.organization_type)}</div>
            </div>
          </div>
        </div>

        {/* Referral Information */}
        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="font-medium text-lg text-primary border-b pb-2">Referral Information</h2>
          <div className="grid gap-3 text-sm">
            <div className="grid grid-cols-[140px_1fr]">
              <div className="text-muted-foreground">How You Found Us</div>
              <div>{formatReferralSource(profile?.referral_source)}</div>
            </div>
            <div className="grid grid-cols-[140px_1fr]">
              <div className="text-muted-foreground">Referral Code</div>
              <div>{displayField(profile?.referral_code)}</div>
            </div>
          </div>
        </div>

        {/* Account Status */}
        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="font-medium text-lg text-primary border-b pb-2">Account Status</h2>
          <div className="grid gap-3 text-sm">
            <div className="grid grid-cols-[140px_1fr]">
              <div className="text-muted-foreground">Status</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Authenticated
              </div>
            </div>
            <div className="grid grid-cols-[140px_1fr]">
              <div className="text-muted-foreground">User ID</div>
              <div className="font-mono text-xs">{user?.id}</div>
            </div>
            <div className="grid grid-cols-[140px_1fr]">
              <div className="text-muted-foreground">Last Sign In</div>
              <div>
                {user.last_sign_in_at
                  ? new Date(user.last_sign_in_at).toLocaleString()
                  : "Never"}
              </div>
            </div>
            <div className="grid grid-cols-[140px_1fr]">
              <div className="text-muted-foreground">Account Created</div>
              <div>
                {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString()
                  : "Unknown"}
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Data Management */}
        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="font-medium text-lg text-primary border-b pb-2">Privacy & Data Management</h2>
          <div className="grid gap-3 text-sm">
            <div className="grid grid-cols-[140px_1fr]">
              <div className="text-muted-foreground">Terms Agreement</div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${profile?.terms_agreement ? 'bg-green-500' : 'bg-red-500'}`}></div>
                {profile?.terms_agreement ? 'Agreed' : 'Not Agreed'}
                {profile?.terms_agreed_at && (
                  <span className="text-xs text-muted-foreground ml-2">
                    ({new Date(profile.terms_agreed_at).toLocaleDateString()})
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-[140px_1fr]">
              <div className="text-muted-foreground">Marketing Consent</div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${profile?.marketing_consent ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                {profile?.marketing_consent ? 'Enabled' : 'Disabled'}
                {profile?.marketing_consent_date && (
                  <span className="text-xs text-muted-foreground ml-2">
                    ({new Date(profile.marketing_consent_date).toLocaleDateString()})
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-[140px_1fr]">
              <div className="text-muted-foreground">Communication</div>
              <div>
                {profile?.communication_preferences?.email_updates ? 'Email updates enabled' : 'Limited communications only'}
              </div>
            </div>
            <div className="grid grid-cols-[140px_1fr] items-start">
              <div className="text-muted-foreground">Data Rights</div>
              <div className="space-y-2">
                <div>
                  <Link href="/protected/privacy" className="text-primary hover:underline text-sm">
                    Manage Privacy Settings →
                  </Link>
                </div>
                <div className="text-xs text-muted-foreground">
                  Export data, update preferences, manage consent
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Early Access Waitlist */}
        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="font-medium text-lg text-primary border-b pb-2">Early Access Program</h2>
          <div className="grid gap-3 text-sm">
            <div className="grid grid-cols-[140px_1fr]">
              <div className="text-muted-foreground">Waitlist Status</div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  profile?.waitlist_status === 'approved' ? 'bg-green-500' : 
                  profile?.waitlist_status === 'pending' ? 'bg-yellow-500' : 'bg-gray-400'
                }`}></div>
                {profile?.waitlist_status === 'approved' ? 'Approved for Early Access' :
                 profile?.waitlist_status === 'pending' ? 'On Waitlist' : 'Not Requested'}
              </div>
            </div>
            <div className="grid grid-cols-[140px_1fr]">
              <div className="text-muted-foreground">Status</div>
              <div>
                {profile?.waitlist_status === 'approved' ? 'Approved for Early Access' :
                 profile?.waitlist_status === 'pending' ? 'On Waitlist' : 'Not Requested'}
              </div>
            </div>
            <div className="grid grid-cols-[140px_1fr] items-start">
              <div className="text-muted-foreground">Next Steps</div>
              <div className="space-y-2">
                <div>
                  <Link href="/protected/waitlist" className="text-primary hover:underline text-sm">
                    {profile?.early_access_requested ? 'View Status & Update Request' : 'Join Early Access Waitlist'} →
                  </Link>
                </div>
                <div className="text-xs text-muted-foreground">
                  Get priority access to CoreBrief&apos;s research platform
                </div>
              </div>
            </div>
          </div>
          
          {profile?.waitlist_status === 'approved' && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <p className="text-sm font-medium text-green-800">
                  🎉 You&apos;ve been approved for early access! Check your email for next steps.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
