"use client";

import type { Sport } from "@/lib/supabase/types";

interface SportSelectorProps {
  sports: Sport[];
  selectedSportId: number | null;
  onChange: (sportId: number) => void;
}

export function SportSelector({
  sports,
  selectedSportId,
  onChange,
}: SportSelectorProps) {
  if (sports.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="board-sport"
        className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
      >
        Dyscyplina
      </label>
      <select
        id="board-sport"
        value={selectedSportId ?? ""}
        onChange={(e) => onChange(Number(e.target.value))}
        className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-emerald-600/50 dark:border-neutral-700 dark:bg-neutral-900"
      >
        {sports.map((sport) => (
          <option key={sport.id} value={sport.id}>
            {sport.name_pl}
          </option>
        ))}
      </select>
    </div>
  );
}
