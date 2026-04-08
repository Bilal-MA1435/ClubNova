"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

type ProviderButtonProps = {
  label: string;
};

export function ProviderButton({ label }: ProviderButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn-primary w-full justify-center disabled:hover:translate-y-0"
      disabled={pending}
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      <span>{pending ? `Connecting ${label}...` : `Continue with ${label}`}</span>
    </button>
  );
}
