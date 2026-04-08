"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SignOutButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn-secondary" disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      <span>{pending ? "Signing out..." : "Sign out"}</span>
    </button>
  );
}
