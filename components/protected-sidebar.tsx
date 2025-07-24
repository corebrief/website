import InPageSidebar from "@/components/in-page-sidebar";

export default async function ProtectedSidebar() {
  return (
    <InPageSidebar
      basePath="/protected"
      items={[
        {
          label: "Account",
          href: "/",
        },
        {
          label: "Privacy",
          href: "/privacy",
        },
        {
          label: "Join Waitlist",
          href: "/waitlist",
        },
        {
          label: "Subscription",
          href: "/subscription",
          disabled: true,
        },
        {
          label: "Paid Content",
          href: "/paid-content",
          disabled: true,
        },
      ]}
    />
  );
}
