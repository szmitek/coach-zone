export function AuthorBadge({
  authorName,
  isOwner,
}: {
  /** null for official library exercises (author_id is null). */
  authorName: string | null;
  isOwner: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-xs text-neutral-500 dark:text-neutral-500">
        {authorName ?? "Oficjalne"}
      </span>
      {isOwner && (
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
          Twoje
        </span>
      )}
    </span>
  );
}
