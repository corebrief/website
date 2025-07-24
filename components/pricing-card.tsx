"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/utils/stripe/subscription";
import { createSupabaseClient } from "@/utils/supabase/client";
import { useState } from "react";

interface PricingCardProps {
  product: Product;
  isCurrentPlan: boolean;
  interval: "month" | "year" | "one-time";
}

export default function PricingCard({
  product,
  isCurrentPlan,
  interval,
}: PricingCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  function getCurrencySymbol(currency_id: string) {
    // This is just an example, and doesn't cover all currencies
    // supported by Stripe
    switch (currency_id) {
      case "usd":
        return "$";
      case "eur":
        return "€";
      case "gbp":
        return "£";
      case "cad":
        return "$";
      case "aud":
        return "$";
      default:
        return currency_id;
    }
  }

  async function handleSelectPlan(priceId: string) {
    setIsLoading(true);
    
    try {
      const supabase = createSupabaseClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsLoading(false);
        return;
      }

      // Call our API to create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          priceId,
          redirectUrl: `${window.location.origin}/protected/subscription`,
          userId: user.id
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      window.location.href = data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setIsLoading(false);
    }
  }

  const productPrice = product.prices?.find(
    price =>
      price.interval_type === interval
  );

  if (!productPrice) {
    return null;
  }

  const { name, description } = product;

  const currency = productPrice.currency;
  const symbol = getCurrencySymbol(currency);
  const priceString = productPrice?.unit_amount
    ? `${symbol}${(productPrice.unit_amount / 100).toFixed(2)}`
    : "Custom";

  return (
    <div className={`border rounded-lg p-6 space-y-4`}>
      <div className="space-y-2">
        <h3 className="text-xl font-medium">{name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{priceString}</span>
          {productPrice?.unit_amount && (
            <span className="text-muted-foreground">/{productPrice.interval_type}</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-4">
        <Button
          className="w-full"
          onClick={() => handleSelectPlan(productPrice.id)}
          disabled={isLoading || isCurrentPlan}
          variant={isCurrentPlan ? "secondary" : "default"}
        >
          {isCurrentPlan ? "Current Plan" : "Select Plan"}
        </Button>
      </div>
    </div>
  );
}
