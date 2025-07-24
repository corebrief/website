import { getProducts } from "@/utils/stripe/subscription";
import { getUserProfile } from "@/utils/supabase/entitlements";
import PricingContent from "@/components/pricing-content";

export default async function PricingPage() {
  const { data: products, error } = await getProducts().then(
    (products) => ({ data: products, error: null }),
    (error) => ({ data: null, error })
  );
  
  const { data: profile } = await getUserProfile();

  if (error) {
    return <div>There was an error loading products. Please try again.</div>;
  }

  // Determine current product from user's subscription
  const currentProductId = profile?.subscription_plan_id || null;

  return (
    <>
      <div>
        <h1 className="text-2xl font-medium">Pricing Plans</h1>
        <p className="text-muted-foreground mt-2">
          Choose the perfect plan for your needs
        </p>
      </div>

      <PricingContent
        products={products || []}
        currentProductId={currentProductId}
      />
    </>
  );
}
