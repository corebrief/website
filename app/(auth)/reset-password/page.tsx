import ResetPasswordForm from "@/components/reset-password-form";
import { Suspense } from "react";

export default function ResetPassword() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex flex-col w-full max-w-sm mx-auto mt-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
} 