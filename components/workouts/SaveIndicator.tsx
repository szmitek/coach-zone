import type { SaveState } from "@/lib/workouts";

const CONFIG: Record<
  Exclude<SaveState, "idle">,
  { text: string; className: string }
> = {
  saving: {
    text: "Zapisywanie…",
    className: "text-neutral-500 dark:text-neutral-400",
  },
  saved: {
    text: "Zapisano",
    className: "text-emerald-600 dark:text-emerald-400",
  },
  error: {
    text: "Błąd zapisu — sprawdź połączenie i spróbuj ponownie.",
    className: "text-red-600 dark:text-red-400",
  },
};

export function SaveIndicator({ state }: { state: SaveState }) {
  if (state === "idle") return null;

  const { text, className } = CONFIG[state];

  return (
    <span
      role={state === "error" ? "alert" : "status"}
      className={`text-right text-sm font-medium ${className}`}
    >
      {text}
    </span>
  );
}
