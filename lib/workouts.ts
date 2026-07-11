import type { WorkoutItem, WorkoutSection } from "@/lib/supabase/types";

export type SaveState = "idle" | "saving" | "saved" | "error";

export const SECTION_ORDER: WorkoutSection[] = [
  "warmup",
  "main",
  "positional",
  "cooldown",
];

export const SECTION_LABELS: Record<WorkoutSection, string> = {
  warmup: "Rozgrzewka",
  main: "Część główna",
  positional: "Ćwiczenia pozycyjne",
  cooldown: "Schłodzenie",
};

export const SECTION_HINTS: Record<WorkoutSection, string> = {
  warmup: "Brak ćwiczeń — dodaj rozgrzewkę, od której zacznie się trening.",
  main: "Brak ćwiczeń — dodaj ćwiczenia stanowiące trzon treningu.",
  positional:
    "Brak ćwiczeń — tu przyda się przypisanie do pozycji lub zawodnika.",
  cooldown: "Brak ćwiczeń — dodaj ćwiczenia kończące i schładzające.",
};

// Used when adding an exercise with no duration_min of its own set.
export const DEFAULT_ITEM_DURATION_MIN = 10;

// Positions are scoped per section and kept as small non-negative integers,
// but not assumed contiguous (deleting an item leaves a gap on purpose, to
// avoid renumbering the rest of the section on every removal). Basing the
// next slot on the current max avoids colliding with a stale gap.
export function nextPosition(sectionItems: WorkoutItem[]): number {
  if (sectionItems.length === 0) return 0;
  return Math.max(...sectionItems.map((item) => item.position)) + 1;
}

// scheduled_for is a plain `date` column (no time/timezone). Parsing it with
// `new Date(string)` reads it as UTC midnight, which can render as the
// previous day in timezones behind UTC - build the Date from components
// instead so formatting stays in local time throughout.
export function formatScheduledDate(value: string | null): string {
  if (!value) return "Brak daty";
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// created_at is a timestamptz, a real instant - safe to parse directly.
export function formatCreatedDate(value: string): string {
  return new Date(value).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatTotalDuration(totalMinutes: number): string {
  return `${totalMinutes} min`;
}

// Shared shape for anything that renders a workout's items read-only - the
// PDF export and the public share page both consume this, one built from
// the owner's WorkoutItem[] + exercise lookup, the other straight from the
// get_shared_workout() RPC payload.
export interface PdfWorkoutItem {
  id: string;
  section: WorkoutSection;
  position: number;
  duration_min: number | null;
  assigned_to: string | null;
  exerciseTitle: string;
  exerciseDescription: string | null;
  exerciseMediaUrl: string | null;
}

export interface WorkoutStats {
  itemCount: number;
  totalMinutes: number;
}

// Shared by the workouts list (item counts) and the calendar view (item
// counts + total duration) - both derive per-workout stats from the same
// flat workout_items rows.
export function summarizeWorkoutItems(
  items: { workout_id: string; duration_min: number | null }[],
): Record<string, WorkoutStats> {
  const stats: Record<string, WorkoutStats> = {};
  for (const item of items) {
    const current = stats[item.workout_id] ?? {
      itemCount: 0,
      totalMinutes: 0,
    };
    current.itemCount += 1;
    current.totalMinutes += item.duration_min ?? 0;
    stats[item.workout_id] = current;
  }
  return stats;
}

export function groupItemsBySection<
  T extends { section: WorkoutSection; position: number },
>(items: T[]): Map<WorkoutSection, T[]> {
  const map = new Map<WorkoutSection, T[]>();
  for (const section of SECTION_ORDER) map.set(section, []);
  for (const item of items) map.get(item.section)?.push(item);
  for (const section of SECTION_ORDER) {
    map.get(section)?.sort((a, b) => a.position - b.position);
  }
  return map;
}
