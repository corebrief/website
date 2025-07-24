"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

interface AuthSubmitButtonProps {
  children?: React.ReactNode;
  pendingText?: string;
}

export default function AuthSubmitButton({ 
  children = "Sign in", 
  pendingText = "Signing in..." 
}: AuthSubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending}>
      {pending ? pendingText : children}
    </Button>
  );
}
