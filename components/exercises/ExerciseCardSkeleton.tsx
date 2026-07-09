export function ExerciseCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
      <div className="h-4 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
      <div className="mt-4 flex gap-2">
        <div className="h-5 w-16 rounded-full bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-5 w-10 rounded-full bg-neutral-200 dark:bg-neutral-800" />
      </div>
      <div className="mt-4 h-3 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
      <div className="mt-2 h-3 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800" />
    </div>
  );
}
