import { checkEntitlement } from "@/utils/supabase/entitlements";

export async function POST() {
  const { data, error } = await checkEntitlement("premium");

  if (error) {
    return new Response("Error checking entitlements", { status: 500 });
  }

  if (!data?.hasAccess) {
    return new Response("Subscription not active", { status: 403 });
  }

  const response = await fetch("https://api.thecatapi.com/v1/images/search");
  const json = await response.json();
  return new Response(JSON.stringify(json));
}
