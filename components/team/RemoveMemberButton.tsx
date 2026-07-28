"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

// Used both for a head coach removing someone else and for a member leaving
// on their own - same delete, RLS (team_members_delete) decides who's
// allowed to run it: is_team_head_coach(team_id) or user_id = auth.uid().
export function RemoveMemberButton({
  teamId,
  userId,
  label,
  confirmLabel,
  onRemoved,
}: {
  teamId: string;
  userId: string;
  label: string;
  confirmLabel: string;
  onRemoved: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRemove() {
    setRemoving(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase
      .from("team_members")
      .delete()
      .eq("team_id", teamId)
      .eq("user_id", userId);

    if (error) {
      setRemoving(false);
      setError("Nie udało się wykonać tej operacji. Spróbuj ponownie.");
      return;
    }

    onRemoved();
  }

  if (confirming) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-neutral-600 dark:text-neutral-400">
          {confirmLabel}
        </span>
        <button
          type="button"
          onClick={handleRemove}
          disabled={removing}
          className="rounded-full bg-red-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {removing ? "…" : "Tak"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          disabled={removing}
          className="rounded-full border border-neutral-300 px-3 py-1 text-xs font-medium transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-700 dark:hover:bg-neutral-900"
        >
          Anuluj
        </button>
        {error && (
          <span className="text-xs text-red-600 dark:text-red-400">
            {error}
          </span>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="rounded-full border border-red-300 px-3 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/40"
    >
      {label}
    </button>
  );
}
