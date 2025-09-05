import { createSupabaseClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PrivacyPreferences from "@/components/privacy-preferences";
import DataExportSection from "@/components/data-export-section";
import PrivacyRequestHistory from "@/components/privacy-request-history";
import AccountDeletionSection from "@/components/account-deletion-section";


export default async function PrivacyDashboard() {
  const client = await createSupabaseClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    return (
      <div>There was an error loading your privacy settings. Please try again.</div>
    );
  }

  // Fetch user profile data
  const { data: profile } = await client
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch privacy request history
  const { data: privacyRequests } = await client
    .from('privacy_requests')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium">Privacy & Data Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage your privacy preferences and exercise your data rights
          </p>
        </div>
        <Link href="/protected">
          <Button variant="outline">Back to Account</Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {/* Privacy Preferences */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-primary border-b pb-2">
            Communication Preferences
          </h2>
          <PrivacyPreferences profile={profile} />
        </Card>

        {/* Data Rights */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Data Export */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-primary border-b pb-2">
              Data Export
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Download a copy of all your personal data in JSON format.
            </p>
            <DataExportSection />
          </Card>

          {/* Account Deletion */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-primary border-b pb-2">
              Account Deletion
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <AccountDeletionSection />
          </Card>
        </div>


        {/* Privacy Request History */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-primary border-b pb-2">
            Privacy Request History
          </h2>
          <PrivacyRequestHistory requests={privacyRequests || []} />
        </Card>

        {/* Legal Information */}
        <Card className="p-6 bg-muted/30">
          <h2 className="text-lg font-semibold mb-4 text-primary border-b pb-2">
            Your Privacy Rights
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium mb-2">Data Protection Rights</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Right to access your personal data</li>
                <li>• Right to correct inaccurate information</li>
                <li>• Right to delete your data</li>
                <li>• Right to data portability</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Contact Information</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Privacy questions: privacy@corebrief.ai</li>
                <li>• General support: info@corebrief.ai</li>
                <li>• Response time: 30 days or less</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              For detailed information about how we process your data, please review our{" "}
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
} 