export function BoardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="h-[76px] animate-pulse rounded-2xl bg-neutral-200 dark:bg-neutral-800" />
      <div
        className="w-full animate-pulse rounded-2xl bg-neutral-200 dark:bg-neutral-800"
        style={{ aspectRatio: "1040 / 680" }}
      />
    </div>
  );
}
