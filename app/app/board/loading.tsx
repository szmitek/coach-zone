import { BoardSkeleton } from "@/components/board/BoardSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-4xl px-4 pt-8 pb-20 sm:px-6">
      <div className="h-8 w-64 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
      <div className="mt-2 h-4 w-80 max-w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
      <div className="mt-6">
        <BoardSkeleton />
      </div>
    </main>
  );
}
