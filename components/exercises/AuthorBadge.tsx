import type { PublicProfile } from "@/lib/supabase/types";
import { ROLE_LABELS } from "@/lib/teams";

// Renders ONLY the coach's pseudonym - never an email or author_id. See
// supabase/migrations/20260712100000_coach_pseudonyms.sql: other coaches'
// attribution is only ever available via list_public_profiles(), which
// returns id + display_name (+ team_roles) and nothing else.
export function AuthorBadge({
  authorId,
  currentUserId,
  authorsById,
  teamId,
}: {
  authorId: string | null;
  currentUserId: string | null | undefined;
  authorsById: Map<string, PublicProfile>;
  /** The item's team_id, to resolve whether the author is head coach or assistant *in that team*. Omit/null for non-team-scoped items. */
  teamId?: string | null;
}) {
  if (authorId === null) {
    return (
      <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400">
        Oficjalne
      </span>
    );
  }

  if (authorId === currentUserId) {
    return (
      <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-xs font-medium text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
        Twoje
      </span>
    );
  }

  const author = authorsById.get(authorId);
  const pseudonym = author?.display_name ?? "Inny trener";
  const role = teamId
    ? author?.team_roles.find((entry) => entry.team_id === teamId)?.role
    : undefined;

  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-xs font-medium text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
      {pseudonym}
      {role && (
        <span className="text-neutral-400 dark:text-neutral-500">
          &nbsp;· {ROLE_LABELS[role]}
        </span>
      )}
    </span>
  );
}
