import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  // Redirect to reports page by default
  redirect("/protected/reports");
}
