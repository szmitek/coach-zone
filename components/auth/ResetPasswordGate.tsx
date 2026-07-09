"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ResetPasswordForm } from "./ResetPasswordForm";

type Status = "checking" | "ready" | "expired";

// Whether a valid recovery session exists can only be known client-side:
// the default (un-edited) recovery email link delivers the session encoded
// in the URL rather than as a cookie a server component could read (see
// app/auth/confirm/route.ts). getUser() waits for the browser client to
// finish processing that URL before resolving, so this works whether the
// session arrived that way or was already established as a cookie.
export function ResetPasswordGate() {
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!cancelled) setStatus(user ? "ready" : "expired");
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "checking") {
    return (
      <p className="text-center text-sm text-neutral-500 dark:text-neutral-500">
        Checking your link…
      </p>
    );
  }

  if (status === "expired") {
    return (
      <div className="space-y-4 text-center">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          This password reset link is invalid or has expired.
        </p>
        <Link
          href="/forgot-password"
          className="block w-full rounded-full bg-emerald-600 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-emerald-500"
        >
          Request a new link
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
        Choose a new password for your account.
      </p>
      <ResetPasswordForm />
    </div>
  );
}
