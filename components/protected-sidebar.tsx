import InPageSidebar from "@/components/in-page-sidebar";
import { checkEntitlement } from "@/utils/supabase/entitlements";

export default async function ProtectedSidebar() {
  const { data } = await checkEntitlement("premium");

  return (
    <InPageSidebar
      basePath="/protected"
      items={[
        {
          label: "Account",
          href: "/",
        },
        {
          label: "Pricing",
          href: "/pricing",
        },
        {
          label: "Subscription",
          href: "/subscription",
        },
        {
          label: "Paid Content",
          href: "/paid-content",
          disabled: !data?.hasAccess,
        },
      ]}
    />
  );
}
