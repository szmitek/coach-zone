// Renders ONLY the coach's pseudonym - never an email or author_id. See
// supabase/migrations/20260712100000_coach_pseudonyms.sql: other coaches'
// attribution is only ever available via list_public_profiles(), which
// returns id + display_name and nothing else.
export function AuthorBadge({
  authorId,
  currentUserId,
  authorsById,
}: {
  authorId: string | null;
  currentUserId: string | null | undefined;
  authorsById: Map<string, { display_name: string }>;
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

  const pseudonym = authorsById.get(authorId)?.display_name ?? "Inny trener";

  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-xs font-medium text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
      {pseudonym}
    </span>
  );
}
