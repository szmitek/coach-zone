"use client";

import { useState } from "react";
import { SITE_URL } from "@/lib/site";

export function ShareWorkoutButton({ shareId }: { shareId: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Always the stable production origin, never window.location.origin -
  // see lib/site.ts. Same value on server and client, so no mount-effect
  // is needed to avoid a hydration mismatch.
  const shareUrl = `${SITE_URL}/w/${shareId}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can be unavailable (older browser, insecure context) -
      // the URL is still visible and selectable in the text field below.
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
      >
        Udostępnij
      </button>
    );
  }

  return (
    <div className="flex w-full flex-col items-end gap-2 sm:w-auto">
      <div className="flex w-full flex-wrap items-center justify-end gap-2">
        <input
          type="text"
          readOnly
          value={shareUrl}
          onFocus={(e) => e.target.select()}
          aria-label="Publiczny link do treningu"
          className="w-full min-w-0 flex-1 truncate rounded-lg border border-neutral-300 bg-white px-2.5 py-1.5 text-xs outline-none dark:border-neutral-700 dark:bg-neutral-900 sm:w-72 sm:flex-none"
        />
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-emerald-500"
        >
          {copied ? "Skopiowano" : "Kopiuj"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="shrink-0 rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
        >
          Zamknij
        </button>
      </div>
    </div>
  );
}
