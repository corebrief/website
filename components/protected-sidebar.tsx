import InPageSidebar from "@/components/in-page-sidebar";

export default async function ProtectedSidebar() {
  return (
    <InPageSidebar
      basePath="/protected"
      items={[
        {
          label: "Your Reports",
          href: "/reports",
        },
        {
          label: "Purchase Reports",
          href: "/purchase",
          disabled: true,
        },
        {
          label: "Account",
          href: "/account",
        },
        {
          label: "Privacy",
          href: "/privacy",
        },
        {
          label: "Join Waitlist",
          href: "/waitlist",
        },
      ]}
    />
  );
}
