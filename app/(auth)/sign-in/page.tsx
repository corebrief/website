import { signInAction } from "@/app/actions";
import AuthSubmitButton from "@/components/auth-submit-button";
import { FormMessage, Message } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function SignIn(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  
  // Convert searchParams to Message format
  const message: Message | Record<string, never> = searchParams.error 
    ? { error: Array.isArray(searchParams.error) ? searchParams.error[0] : searchParams.error }
    : searchParams.success
    ? { success: Array.isArray(searchParams.success) ? searchParams.success[0] : searchParams.success }
    : searchParams.message
    ? { message: Array.isArray(searchParams.message) ? searchParams.message[0] : searchParams.message }
    : {};

  return (
    <form
      className="flex-1 flex flex-col w-full max-w-sm mx-auto mt-24"
      action={signInAction}
    >
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Don&apos;t have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <Link 
            href="/forgot-password" 
            className="text-xs text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <AuthSubmitButton />
        <FormMessage message={message} />
      </div>
    </form>
  );
}
