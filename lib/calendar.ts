// All helpers work on local-midnight Date objects and never round-trip
// through toISOString()/Date parsing of ISO strings - both convert through
// UTC and can shift the calendar day depending on the viewer's timezone,
// the same pitfall documented next to formatScheduledDate in lib/workouts.ts.

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addDays(date: Date, days: number): Date {
  const next = startOfDay(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function addWeeks(date: Date, weeks: number): Date {
  return addDays(date, weeks * 7);
}

// Monday-start week, matching Polish/European convention.
export function getWeekStart(date: Date): Date {
  const day = startOfDay(date);
  const weekday = day.getDay(); // 0 = Sunday, 1 = Monday, ...
  const diffFromMonday = weekday === 0 ? -6 : 1 - weekday;
  return addDays(day, diffFromMonday);
}

export function getWeekDays(weekStart: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
}

// Matches the Postgres `date` column format and the value <input type="date">
// reads/writes, built from local components (not toISOString).
export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function isSameDay(a: Date, b: Date): boolean {
  return toDateKey(a) === toDateKey(b);
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatDayLabel(date: Date): string {
  const weekday = date.toLocaleDateString("pl-PL", { weekday: "long" });
  const dayMonth = date.toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
  });
  return `${capitalize(weekday)}, ${dayMonth}`;
}

export function formatWeekRangeLabel(weekStart: Date): string {
  const weekEnd = addDays(weekStart, 6);
  const sameMonth =
    weekStart.getMonth() === weekEnd.getMonth() &&
    weekStart.getFullYear() === weekEnd.getFullYear();

  const startLabel = weekStart.toLocaleDateString(
    "pl-PL",
    sameMonth ? { day: "numeric" } : { day: "numeric", month: "long" },
  );
  const endLabel = weekEnd.toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return `${startLabel} – ${endLabel}`;
}
