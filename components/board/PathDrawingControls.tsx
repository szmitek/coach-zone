"use client";

interface PathDrawingControlsProps {
  pointCount: number;
  onFinish: () => void;
  onUndoPoint: () => void;
  onCancel: () => void;
  /** null when the tool being drawn doesn't support a curve toggle. */
  curveMode: "sharp" | "smooth" | null;
  onCurveModeChange: (mode: "sharp" | "smooth") => void;
}

export function PathDrawingControls({
  pointCount,
  onFinish,
  onUndoPoint,
  onCancel,
  curveMode,
  onCurveModeChange,
}: PathDrawingControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-sm dark:border-emerald-900/50 dark:bg-emerald-950/30">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-emerald-800 dark:text-emerald-300">
          Stukaj kolejne punkty trasy (zaznaczono: {pointCount}). Zakończ
          dwukrotnym dotknięciem ekranu lub przyciskiem „Gotowe”.
        </span>
        {curveMode && (
          <div className="flex shrink-0 overflow-hidden rounded-full border border-emerald-300 text-xs dark:border-emerald-800">
            <button
              type="button"
              onClick={() => onCurveModeChange("sharp")}
              aria-pressed={curveMode === "sharp"}
              className={`px-2.5 py-1 font-medium transition-colors ${
                curveMode === "sharp"
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-emerald-800 hover:bg-emerald-50 dark:bg-neutral-900 dark:text-emerald-300"
              }`}
            >
              Trasa ostra
            </button>
            <button
              type="button"
              onClick={() => onCurveModeChange("smooth")}
              aria-pressed={curveMode === "smooth"}
              className={`px-2.5 py-1 font-medium transition-colors ${
                curveMode === "smooth"
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-emerald-800 hover:bg-emerald-50 dark:bg-neutral-900 dark:text-emerald-300"
              }`}
            >
              Trasa gładka
            </button>
          </div>
        )}
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={onUndoPoint}
          disabled={pointCount === 0}
          className="rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          Cofnij punkt
        </button>
        <button
          type="button"
          onClick={onFinish}
          disabled={pointCount < 2}
          className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Gotowe
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          Anuluj
        </button>
      </div>
    </div>
  );
}
