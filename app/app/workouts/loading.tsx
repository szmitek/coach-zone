import { WorkoutCardSkeleton } from "@/components/workouts/WorkoutCardSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-6 pt-8 pb-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-48 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-4 w-64 max-w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <div className="h-10 w-36 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <WorkoutCardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}
