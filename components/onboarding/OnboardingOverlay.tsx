"use client";

import { useState, useTransition } from "react";
import { completeOnboarding } from "@/app/app/actions";
import { OnboardingShowcaseLoader } from "@/components/showcase/ShowcaseLoader";

/**
 * Full-screen, first-login-only welcome. Rendered by app/app/page.tsx only
 * when the profile's `onboarding_completed` flag is still false - once
 * dismissed (either control), that flag flips server-side so this never
 * shows again for this account, on any device.
 */
export function OnboardingOverlay() {
  const [dismissed, setDismissed] = useState(false);
  const [isPending, startTransition] = useTransition();

  function finish() {
    // Dismiss immediately - the coach shouldn't wait on a network
    // round-trip to get into the app. The write still happens; if it's
    // ever lost mid-flight the next login just shows this once more.
    setDismissed(true);
    startTransition(() => {
      completeOnboarding();
    });
  }

  if (dismissed) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-neutral-950 text-white">
      <div className="flex items-center justify-between px-5 pt-5 sm:px-8 sm:pt-8">
        <span className="text-sm font-semibold tracking-tight text-neutral-300">
          Coach Zone
        </span>
        <button
          type="button"
          onClick={finish}
          className="text-sm text-neutral-400 transition-colors hover:text-white"
        >
          Pomiń
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-6 sm:px-10">
        <div className="w-full max-w-3xl">
          <OnboardingShowcaseLoader className="aspect-[4/3] w-full sm:aspect-[16/9]" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 px-6 pb-10 text-center sm:pb-14">
        <p className="max-w-md text-sm text-neutral-400">
          Tak wygląda tablica taktyczna Coach Zone — narysujesz na niej akcję
          dla dowolnej dyscypliny w kilka sekund.
        </p>
        <button
          type="button"
          onClick={finish}
          disabled={isPending}
          className="rounded-full bg-emerald-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 disabled:opacity-60"
        >
          Zacznij
        </button>
      </div>
    </div>
  );
}
