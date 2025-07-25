"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Subscription } from "@/utils/stripe/subscription";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubscriptionActions({
  subscription,
}: {
  subscription: Subscription;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleCancelSubscription(id: string) {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/manage-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId: id,
          action: 'cancel'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }

      router.refresh();
    } catch (error) {
      console.error('Error cancelling subscription:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleReactivateSubscription(id: string) {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/manage-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId: id,
          action: 'reactivate'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reactivate subscription');
      }

      router.refresh();
    } catch (error) {
      console.error('Error reactivating subscription:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {!subscription.cancel_at_period_end && (
        <Button
          onClick={() => handleCancelSubscription(subscription.id)}
          disabled={isLoading}
          variant="destructive"
          className="w-full"
        >
          <Spinner variant="primary" isLoading={isLoading} />
          {isLoading ? "Cancelling..." : "Cancel Subscription"}
        </Button>
      )}
      {subscription.cancel_at_period_end && (
        <Button
          onClick={() => handleReactivateSubscription(subscription.id)}
          disabled={isLoading}
          className="w-full"
        >
          <Spinner variant="primary" isLoading={isLoading} />
          {isLoading ? "Reactivating..." : "Reactivate Subscription"}
        </Button>
      )}
    </>
  );
}
