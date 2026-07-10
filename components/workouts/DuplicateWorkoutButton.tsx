"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function DuplicateWorkoutButton({ workoutId }: { workoutId: string }) {
  const router = useRouter();
  const [duplicating, setDuplicating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDuplicate() {
    setDuplicating(true);
    setError(null);

    const supabase = createClient();
    const { data, error } = await supabase.rpc("duplicate_workout", {
      p_workout_id: workoutId,
    });

    if (error || !data) {
      setDuplicating(false);
      setError("Nie udało się zduplikować treningu. Spróbuj ponownie.");
      return;
    }

    router.push(`/app/workouts/${data.id}`);
    router.refresh();
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handleDuplicate}
        disabled={duplicating}
        className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-700 dark:hover:bg-neutral-900"
      >
        {duplicating ? "Duplikowanie…" : "Duplikuj"}
      </button>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
