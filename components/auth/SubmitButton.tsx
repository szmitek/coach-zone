import type { ReactNode } from "react";

export function SubmitButton({
  loading,
  loadingText,
  children,
}: {
  loading?: boolean;
  loadingText?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (loadingText ?? "Chwileczkę…") : children}
    </button>
  );
}
