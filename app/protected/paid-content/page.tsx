import { checkEntitlement } from "@/utils/supabase/entitlements";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PaidContentCard from "@/components/paid-content-card";
import Link from "next/link";

export default async function PaidContent() {
  const { data, error } = await checkEntitlement("premium");

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-red-600">Error</h2>
          <p className="mt-2 text-muted-foreground">
            There was an error fetching your subscriptions.
          </p>
        </Card>
      </div>
    );
  }

  if (!data?.hasAccess) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Card className="p-6">
          <h2 className="text-xl font-semibold">No Access</h2>
          <p className="mt-2 text-muted-foreground">
            You don&apos;t have access to any paid content.
          </p>
          <Link href="/protected/pricing">
            <Button className="mt-4" variant="outline">
              Upgrade Now
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-medium">Cat Photo Generator</h1>
        <p className="text-muted-foreground mt-2">Generate cat photos</p>
      </div>
      <PaidContentCard className="mt-4" />
    </div>
  );
}
