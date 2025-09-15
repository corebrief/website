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
          label: "Reports",
          href: "/reports",
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
          label: "Paid Content",
          href: "/paid-content",
          disabled: true,
        },
      ]}
    />
  );
}
