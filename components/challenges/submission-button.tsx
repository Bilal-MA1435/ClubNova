"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SubmissionButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn-primary w-full justify-center" disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      <span>{pending ? "Submitting..." : "Submit entry"}</span>
    </button>
  );
}
