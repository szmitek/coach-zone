export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <header className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-3xl px-6 py-4">
          <div className="h-6 w-32 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pt-8 pb-20">
        <div className="h-8 w-2/3 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />

        <div className="mt-8 space-y-3">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-xl border border-neutral-200 dark:border-neutral-800"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
