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
          label: "Purchase Reports",
          href: "/purchase",
          disabled: true,
        },
        {
          label: "Your Reports",
          href: "/reports",
        },
      ]}
    />
  );
}
