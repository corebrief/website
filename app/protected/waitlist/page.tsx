import { createSupabaseClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import WaitlistForm from "@/components/waitlist-form";
import WaitlistStatus from "@/components/waitlist-status";


export default async function WaitlistPage() {
  const client = await createSupabaseClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    return (
      <div>There was an error loading your waitlist status. Please try again.</div>
    );
  }

  // Fetch user profile with waitlist information
  const { data: profile } = await client
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch user's waitlist requests
  const { data: waitlistRequests } = await client
    .from('waitlist_requests')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const hasActiveRequest = waitlistRequests?.some(req => 
    ['pending', 'reviewed'].includes(req.status)
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium">Early Access Waitlist</h1>
          <p className="text-muted-foreground mt-2">
            Join the exclusive early access program for CoreBrief&apos;s institutional research platform
          </p>
        </div>
        <Link href="/protected">
          <Button variant="outline">Back to Account</Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {/* Waitlist Status */}
        <WaitlistStatus 
          profile={profile}
          requests={waitlistRequests || []}
        />

        {/* Product Preview */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-primary border-b pb-2">
            What You&apos;ll Get Early Access To
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">🔬 AI-Powered Analysis</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Multi-agent equity research reports</li>
                <li>• Conservative suitability assessments</li>
                <li>• Historical trend analysis</li>
                <li>• Forward-looking scenario modeling</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">📊 Institutional Features</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Custom portfolio screening</li>
                <li>• Risk-adjusted performance metrics</li>
                <li>• Regulatory compliance reporting</li>
                <li>• API access for integration</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">🎯 Family Office Focus</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Conservative investment strategies</li>
                <li>• Wealth preservation analysis</li>
                <li>• ESG screening capabilities</li>
                <li>• Multi-generational planning tools</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">⚡ Early Access Benefits</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 50% discount on first year</li>
                <li>• Priority feature requests</li>
                <li>• Direct founder access</li>
                <li>• Custom onboarding support</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Waitlist Form */}
        {!hasActiveRequest && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-primary border-b pb-2">
              Request Early Access
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Tell us about your investment needs to help us prioritize your early access invitation.
            </p>
            <WaitlistForm userId={user.id} />
          </Card>
        )}

        {/* Timeline */}
        <Card className="p-6 bg-muted/30">
          <h2 className="text-lg font-semibold mb-4 text-primary border-b pb-2">
            Expected Timeline
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div>
                <p className="font-medium text-sm">Alpha Testing</p>
                <p className="text-xs text-muted-foreground">Q3 2025 - Q4 2026 - Limited family offices</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <div>
                <p className="font-medium text-sm">Beta Release</p>
                <p className="text-xs text-muted-foreground">Q1 2027 - Q4 2027 - Expanded access for RIAs</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <div>
                <p className="font-medium text-sm">General Availability</p>
                <p className="text-xs text-muted-foreground">Q1 2028 - Public launch</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-background rounded-lg border">
            <p className="text-xs text-muted-foreground">
              <strong>Note:</strong> Timeline estimates are subject to change based on development progress and user feedback. 
              Early access participants will receive priority notification of any timeline updates.
            </p>
          </div>
        </Card>

        {/* FAQ */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-primary border-b pb-2">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-medium mb-1">How does the waitlist work?</h3>
              <p className="text-muted-foreground">
                We prioritize access based on organization type, AUM, and specific use cases. 
                Family offices and RIAs with immediate needs receive highest priority.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">What&apos;s included in early access?</h3>
              <p className="text-muted-foreground">
                Full platform access, priority support, and significant input on feature development. 
                Early access users help shape the final product.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Is there a cost for early access?</h3>
              <p className="text-muted-foreground">
                Early access includes a 50% discount on our standard pricing once we launch. 
                Alpha testing may be complimentary based on feedback commitment.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Can I change my waitlist request?</h3>
              <p className="text-muted-foreground">
                Yes, contact us at{" "}
                <a href="mailto:waitlist@corebrief.ai" className="text-primary hover:underline">
                  waitlist@corebrief.ai
                </a>{" "}
                to update your requirements or timeline.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 