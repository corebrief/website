import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createSupabaseClient } from "@/utils/supabase/server";

export default async function Header() {
  const client = await createSupabaseClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  return (
    <nav className="border-b w-full h-20 shrink-0 flex items-center bg-background">
      <div className="px-6 w-full flex items-center justify-between mx-auto">
        <Link href="/" className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary">
          CoreBrief
        </Link>
        <div className="flex items-center gap-2">
          {user == null && (
            <>
              <Button variant="outline" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
