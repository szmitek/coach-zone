export default function Loading() {
  return (
    <main className="mx-auto max-w-5xl px-6 pt-8 pb-24">
      <div className="h-4 w-32 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-56 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-4 w-40 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-28 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-9 w-28 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </div>

      <div className="mt-6 h-14 animate-pulse rounded-2xl bg-neutral-200 dark:bg-neutral-800" />

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="h-48 animate-pulse rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900"
          />
        ))}
      </div>
    </main>
  );
}
