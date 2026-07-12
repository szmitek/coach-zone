import Link from "next/link";
import {
  SECTION_LABELS,
  SECTION_ORDER,
  formatScheduledDate,
  formatTotalDuration,
  groupItemsBySection,
  type PdfWorkoutItem,
} from "@/lib/workouts";
import type { SharedWorkoutPayload } from "@/lib/supabase/types";
import { DownloadPdfButton } from "./DownloadPdfButton";

export function SharedWorkoutView({
  payload,
}: {
  payload: SharedWorkoutPayload;
}) {
  const { workout, items } = payload;

  const pdfItems: PdfWorkoutItem[] = items.map((item) => ({
    id: item.id,
    section: item.section,
    position: item.position,
    duration_min: item.duration_min,
    assigned_to: item.assigned_to,
    exerciseTitle: item.exercise?.title ?? "Ćwiczenie niedostępne",
    exerciseDescription: item.exercise?.description ?? null,
    exerciseSteps: item.exercise?.steps ?? [],
    exerciseEquipment: item.exercise?.equipment ?? [],
    exerciseMediaUrl: item.exercise?.media_url ?? null,
  }));

  const itemsBySection = groupItemsBySection(pdfItems);
  const totalMinutes = pdfItems.reduce(
    (sum, item) => sum + (item.duration_min ?? 0),
    0,
  );

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <header className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-3xl px-6 py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Coach Zone
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pt-8 pb-20">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {workout.title}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-600 dark:text-neutral-400">
          {workout.team_name && <span>{workout.team_name}</span>}
          <span>{formatScheduledDate(workout.scheduled_for)}</span>
          <span>Łączny czas: {formatTotalDuration(totalMinutes)}</span>
        </div>

        <div className="mt-4">
          <DownloadPdfButton workout={workout} items={pdfItems} />
        </div>

        <div className="mt-8 space-y-8">
          {items.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-neutral-300 px-4 py-8 text-center text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-500">
              Ten trening nie ma jeszcze żadnych ćwiczeń.
            </p>
          ) : (
            SECTION_ORDER.map((section) => {
              const sectionItems = itemsBySection.get(section) ?? [];
              if (sectionItems.length === 0) return null;

              return (
                <section key={section}>
                  <h2 className="font-semibold tracking-tight">
                    {SECTION_LABELS[section]}
                  </h2>
                  <div className="mt-3 space-y-3">
                    {sectionItems.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-xl border border-neutral-200 p-3 dark:border-neutral-800"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                          <span className="text-sm font-semibold">
                            {item.exerciseTitle}
                          </span>
                          <span className="text-xs text-neutral-500 dark:text-neutral-500">
                            {formatTotalDuration(item.duration_min ?? 0)}
                            {item.assigned_to ? ` · ${item.assigned_to}` : ""}
                          </span>
                        </div>
                        {item.exerciseDescription && (
                          <p className="mt-1.5 whitespace-pre-line text-sm text-neutral-600 dark:text-neutral-400">
                            {item.exerciseDescription}
                          </p>
                        )}
                        {item.exerciseMediaUrl && (
                          <div className="mt-2 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
                            {/* eslint-disable-next-line @next/next/no-img-element -- remote Supabase Storage URL, no next/image domain config in this env */}
                            <img
                              src={item.exerciseMediaUrl}
                              alt={`Diagram ćwiczenia „${item.exerciseTitle}”`}
                              className="w-full max-w-xs"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );
            })
          )}
        </div>

        {workout.notes && (
          <div className="mt-10 border-t border-neutral-200 pt-6 dark:border-neutral-800">
            <h2 className="font-semibold tracking-tight">Notatki</h2>
            <p className="mt-2 whitespace-pre-line text-sm text-neutral-600 dark:text-neutral-400">
              {workout.notes}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
