export default function Loading() {
  return (
    <main className="mx-auto max-w-2xl px-6 pt-8 pb-20">
      <div className="h-8 w-48 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
      <div className="mt-2 h-4 w-80 max-w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />

      <div className="mt-8 space-y-5">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="space-y-1.5">
            <div className="h-3.5 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-10 w-full animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
          </div>
        ))}
      </div>
    </main>
  );
}
