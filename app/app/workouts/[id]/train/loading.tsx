export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950">
      <div
        aria-hidden="true"
        className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white"
      />
    </div>
  );
}
