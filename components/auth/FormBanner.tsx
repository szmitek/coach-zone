export function FormBanner({
  variant,
  message,
}: {
  variant: "error" | "success";
  message?: string | null;
}) {
  if (!message) return null;

  const styles =
    variant === "error"
      ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400"
      : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400";

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={`mb-4 rounded-lg border px-3 py-2 text-sm ${styles}`}
    >
      {message}
    </div>
  );
}
