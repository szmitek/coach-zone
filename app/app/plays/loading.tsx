export default function Loading() {
  return (
    <main className="mx-auto max-w-5xl px-6 pt-8 pb-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-32 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-4 w-64 max-w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <div className="h-10 w-36 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
      </div>

      <div className="mt-8 h-16 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-900" />

      <div className="mt-8 space-y-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="h-14 animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-900"
          />
        ))}
      </div>
    </main>
  );
}
