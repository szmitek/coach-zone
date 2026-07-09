"use client";

import { useState } from "react";
import type { Workout } from "@/lib/supabase/types";
import type { PdfWorkoutItem } from "@/lib/workouts";

// PDF export runs entirely client-side (no server function, no Vercel
// route) - @react-pdf/renderer and the document tree are dynamically
// imported here so their (sizeable) bundle only loads when this button is
// actually clicked, and never touches the server render path.
function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "trening"
  );
}

export function DownloadPdfButton({
  workout,
  items,
  className,
}: {
  workout: Workout;
  items: PdfWorkoutItem[];
  className?: string;
}) {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(false);

  async function handleClick() {
    setGenerating(true);
    setError(false);
    try {
      const [{ pdf }, { WorkoutPdfDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./WorkoutPdfDocument"),
      ]);

      const blob = await pdf(
        <WorkoutPdfDocument workout={workout} items={items} />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${slugify(workout.title)}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      setError(true);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleClick}
        disabled={generating}
        className={
          className ??
          "rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-700 dark:hover:bg-neutral-900"
        }
      >
        {generating ? "Generowanie…" : "Pobierz PDF"}
      </button>
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400">
          Nie udało się wygenerować PDF. Spróbuj ponownie.
        </p>
      )}
    </div>
  );
}
