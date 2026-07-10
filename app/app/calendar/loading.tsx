import { WorkoutCardSkeleton } from "@/components/workouts/WorkoutCardSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-6 pt-8 pb-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-56 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-4 w-40 max-w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <div className="h-10 w-36 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
      </div>

      <div className="mt-6 h-9 w-64 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-7">
        {Array.from({ length: 7 }, (_, i) => (
          <WorkoutCardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}
