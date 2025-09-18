import SubscriptionActions from "@/components/subcription-actions";
import { Card } from "@/components/ui/card";
import { cn } from "@/utils/styles";
import { getUserSubscriptions } from "@/utils/stripe/subscription";
import { createSupabaseClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return <div>Please log in to view your subscriptions.</div>;
  }

  const subscriptions = await getUserSubscriptions(user.id);

  if (!subscriptions || subscriptions.length === 0) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-medium">Subscriptions</h1>
            <p className="text-muted-foreground mt-2">
              Manage your subscription plans
            </p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground">No active subscriptions found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium">Subscriptions</h1>
          <p className="text-muted-foreground mt-2">
            Manage your subscription plans
          </p>
        </div>
      </div>
      <div className="space-y-6">
        {subscriptions.map((subscription, index) => (
          <Card key={index}>
            <h2 className="font-medium">{subscription.product.name}</h2>
            <div className="grid gap-2 mt-2 text-sm">
              <div className="grid grid-cols-[150px_1fr]">
                <div className="text-muted-foreground">Plan description</div>
                <div>{subscription.product.description}</div>
              </div>
              <div className="grid grid-cols-[150px_1fr]">
                <div className="text-muted-foreground">Price</div>
                <div>
                  ${(subscription.price.unit_amount / 100).toFixed(2)} per{" "}
                  {subscription.price.interval}
                </div>
              </div>
              <div className="grid grid-cols-[150px_1fr]">
                <div className="text-muted-foreground">Status</div>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full bg-green-500",
                      (subscription.status === "past_due" ||
                        subscription.cancel_at_period_end) &&
                        "bg-yellow-500",
                      subscription.status === "inactive" && "bg-red-500"
                    )}
                  ></div>
                  {subscription.status === "active" &&
                    !subscription.cancel_at_period_end &&
                    "Active"}
                  {subscription.status === "active" &&
                    subscription.cancel_at_period_end &&
                    "Cancelling at period end"}
                  {subscription.status === "past_due" && "Past due"}
                  {subscription.status === "inactive" && "Inactive"}
                </div>
              </div>
              <SubscriptionActions subscription={subscription} />
            </div>
          </Card>
        ))}
      </div>
      <div>
        <h3 className="text-lg font-medium">Raw Data</h3>
        <div className="mt-2 border p-4 rounded-lg">
          <pre>{JSON.stringify(subscriptions, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
