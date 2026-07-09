export function WorkoutCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
      <div className="h-4 w-2/3 rounded bg-neutral-200 dark:bg-neutral-800" />
      <div className="mt-4 h-3 w-1/2 rounded bg-neutral-200 dark:bg-neutral-800" />
      <div className="mt-2 h-3 w-1/3 rounded bg-neutral-200 dark:bg-neutral-800" />
      <div className="mt-5 flex justify-end">
        <div className="h-8 w-20 rounded-full bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </div>
  );
}
