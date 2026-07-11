"use client";

export function SaveExerciseDialog({
  isPublic,
  saving,
  onConfirm,
  onCancel,
}: {
  isPublic: boolean;
  saving: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={saving ? undefined : onCancel}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="save-exercise-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border-2 border-amber-400 bg-white p-6 dark:border-amber-600 dark:bg-neutral-900"
      >
        <h2
          id="save-exercise-title"
          className="text-lg font-bold text-amber-700 dark:text-amber-400"
        >
          Tej operacji nie da się cofnąć
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
          <li>Po zapisaniu ćwiczenia nie będzie można go już edytować.</li>
          <li>
            Aby cokolwiek zmienić, będziesz musiał je zduplikować i zapisać jako
            nowe ćwiczenie.
          </li>
          {isPublic ? (
            <li>
              Ćwiczenie będzie <strong>publiczne</strong> — trafi do wspólnej
              biblioteki i zobaczą je inni trenerzy. Publicznego ćwiczenia{" "}
              <strong>nie da się usunąć</strong>.
            </li>
          ) : (
            <li>
              Ćwiczenie będzie <strong>prywatne</strong> — widoczne tylko dla
              Ciebie. Prywatne ćwiczenie można później usunąć.
            </li>
          )}
        </ul>
        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-700 dark:hover:bg-neutral-900"
          >
            Wróć do edycji
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={saving}
            className="rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Zapisywanie…" : "Rozumiem, zapisz na stałe"}
          </button>
        </div>
      </div>
    </div>
  );
}
