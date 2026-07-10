export default function Loading() {
  return (
    <main className="mx-auto max-w-2xl px-6 pt-8 pb-20">
      <div className="h-4 w-32 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />

      <div className="mt-4 h-8 w-2/3 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <div className="h-5 w-20 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-5 w-16 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-5 w-12 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
      </div>

      <div className="mt-6 space-y-2">
        <div className="h-4 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </main>
  );
}
