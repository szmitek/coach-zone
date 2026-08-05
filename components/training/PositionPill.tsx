const TEAM_LABEL = "Cała drużyna";

// Training mode's own high-contrast take on PositionPills - dark background
// throughout regardless of system theme (see TrainingMode.tsx), so it can't
// reuse the light/dark-aware component from components/exercises.
export function PositionPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-bold tracking-wide text-emerald-300 uppercase">
      {label}
    </span>
  );
}

export function PositionPillRow({ codes }: { codes: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {codes.length === 0 ? (
        <PositionPill label={TEAM_LABEL} />
      ) : (
        codes.map((code) => <PositionPill key={code} label={code} />)
      )}
    </div>
  );
}
