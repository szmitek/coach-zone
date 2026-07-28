"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { SITE_URL } from "@/lib/site";
import type { TeamInvite } from "@/lib/supabase/types";

function formatExpiry(value: string): string {
  return new Date(value).toLocaleString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function InvitesPanel({
  teamId,
  invites,
  currentUserId,
  onChanged,
}: {
  teamId: string;
  invites: TeamInvite[];
  currentUserId: string;
  onChanged: () => void;
}) {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  // Revoked invites are done, full stop - no reason to keep showing them.
  // Expired-but-not-revoked ones still show (with a "Wygasło" flag) so a
  // head coach can tell "never created" apart from "went stale" and still
  // has something to explicitly revoke for tidiness.
  const activeInvites = [...invites]
    .filter((invite) => !invite.revoked_at)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));

  async function handleCreate() {
    setCreating(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase
      .from("team_invites")
      .insert({ team_id: teamId, created_by: currentUserId });

    setCreating(false);
    if (error) {
      setError("Nie udało się utworzyć zaproszenia. Spróbuj ponownie.");
      return;
    }
    onChanged();
  }

  async function handleRevoke(inviteId: string) {
    setRevokingId(inviteId);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase
      .from("team_invites")
      .update({ revoked_at: new Date().toISOString() })
      .eq("id", inviteId);

    setRevokingId(null);
    if (error) {
      setError("Nie udało się odwołać zaproszenia. Spróbuj ponownie.");
      return;
    }
    onChanged();
  }

  async function handleCopy(token: string, inviteId: string) {
    const url = `${SITE_URL}/join/${token}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(inviteId);
      setTimeout(
        () => setCopiedId((current) => (current === inviteId ? null : current)),
        2000,
      );
    } catch {
      // Clipboard API can be unavailable - the link is still visible and
      // selectable in the field below.
    }
  }

  return (
    <div className="mt-6 border-t border-neutral-200 pt-6 dark:border-neutral-800">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold">Zaproszenia</h3>
        <button
          type="button"
          onClick={handleCreate}
          disabled={creating}
          className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {creating ? "Tworzenie…" : "+ Nowe zaproszenie"}
        </button>
      </div>

      {error && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}

      {activeInvites.length === 0 ? (
        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-500">
          Brak aktywnych zaproszeń.
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {activeInvites.map((invite) => {
            const expired = new Date(invite.expires_at).getTime() <= Date.now();
            const url = `${SITE_URL}/join/${invite.token}`;
            return (
              <li
                key={invite.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200 p-3 text-sm dark:border-neutral-800"
              >
                <div className="min-w-0 flex-1">
                  <input
                    type="text"
                    readOnly
                    value={url}
                    onFocus={(e) => e.target.select()}
                    aria-label="Link zaproszenia"
                    className="w-full min-w-0 truncate rounded-lg border border-neutral-300 bg-white px-2.5 py-1.5 text-xs outline-none dark:border-neutral-700 dark:bg-neutral-900"
                  />
                  <p
                    className={`mt-1 text-xs ${
                      expired
                        ? "text-red-600 dark:text-red-400"
                        : "text-neutral-500 dark:text-neutral-500"
                    }`}
                  >
                    {expired ? "Wygasło" : "Wygasa"} {formatExpiry(invite.expires_at)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(invite.token, invite.id)}
                    className="rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
                  >
                    {copiedId === invite.id ? "Skopiowano" : "Kopiuj"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRevoke(invite.id)}
                    disabled={revokingId === invite.id}
                    className="rounded-full border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/40"
                  >
                    {revokingId === invite.id ? "…" : "Odwołaj"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
