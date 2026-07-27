import type { Position } from "@/lib/supabase/types";

// Deliberately quieter than CategoryBadge/SportBadge - position is a
// secondary axis, not the primary classification of an exercise. Callers
// are expected to pass positions already sorted by sort_order.
export function PositionPills({ positions }: { positions: Position[] }) {
  if (positions.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1">
      {positions.map((position) => (
        <span
          key={position.id}
          className="inline-flex items-center rounded-full bg-neutral-100/70 px-2 py-0.5 text-[11px] font-medium text-neutral-500 dark:bg-neutral-900/60 dark:text-neutral-500"
        >
          {position.label}
        </span>
      ))}
    </div>
  );
}
