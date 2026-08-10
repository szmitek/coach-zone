import Link from "next/link";

export function TrainingCompleteScreen({
  workoutId,
  workoutTitle,
}: {
  workoutId: string;
  workoutTitle: string;
}) {
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-dvh flex-col items-center justify-center gap-3 bg-neutral-950 px-6 text-center text-white">
      <p className="text-sm font-semibold tracking-wide text-emerald-400 uppercase">
        Trening zakończony
      </p>
      <h1 className="text-2xl font-bold tracking-tight text-balance">
        {workoutTitle}
      </h1>
      <p className="text-neutral-400">Wszystkie sekcje zostały przećwiczone.</p>
      <Link
        href={`/app/workouts/${workoutId}`}
        className="mt-4 rounded-full bg-emerald-500 px-6 py-3 text-lg font-bold text-neutral-950 transition-colors active:bg-emerald-400"
      >
        Powrót do treningu
      </Link>
    </div>
  );
}
