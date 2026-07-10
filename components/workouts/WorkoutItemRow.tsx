"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { CategoryBadge } from "@/components/exercises/CategoryBadge";
import { DifficultyIndicator } from "@/components/exercises/DifficultyIndicator";
import { SECTION_LABELS, SECTION_ORDER } from "@/lib/workouts";
import type {
  Category,
  Exercise,
  WorkoutItem,
  WorkoutSection,
} from "@/lib/supabase/types";

export function WorkoutItemRow({
  item,
  exercise,
  category,
  onDurationChange,
  onAssignedToChange,
  onMoveToSection,
  onRemove,
}: {
  item: WorkoutItem;
  exercise: Exercise | undefined;
  category: Category | undefined;
  onDurationChange: (itemId: string, value: string) => void;
  onAssignedToChange: (itemId: string, value: string) => void;
  onMoveToSection: (itemId: string, section: WorkoutSection) => void;
  onRemove: (itemId: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });
  const [confirmingRemove, setConfirmingRemove] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-xl border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-950 ${
        isDragging ? "z-10 opacity-90 shadow-lg" : ""
      }`}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          {...attributes}
          {...listeners}
          aria-label="Przeciągnij, aby zmienić kolejność"
          className="mt-0.5 shrink-0 touch-none rounded p-1 text-base leading-none text-neutral-400 hover:text-neutral-600 active:cursor-grabbing dark:hover:text-neutral-300 cursor-grab"
        >
          ⠿
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {exercise ? (
              <a
                href={`/app/exercises/${exercise.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-sm font-semibold hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                {exercise.title}
              </a>
            ) : (
              <span className="text-sm font-semibold text-neutral-400">
                Ćwiczenie niedostępne
              </span>
            )}
            {category && (
              <CategoryBadge name={category.name_pl} slug={category.slug} />
            )}
            {exercise && (
              <DifficultyIndicator difficulty={exercise.difficulty} />
            )}
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <label className="text-xs text-neutral-500 dark:text-neutral-500">
              Czas (min)
              <input
                type="number"
                min={0}
                value={item.duration_min ?? ""}
                onChange={(e) => onDurationChange(item.id, e.target.value)}
                className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-2 py-1.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-emerald-600/50 dark:border-neutral-700 dark:bg-neutral-900"
              />
            </label>

            <label className="col-span-1 text-xs text-neutral-500 dark:text-neutral-500 sm:col-span-2">
              Przypisanie
              <input
                type="text"
                value={item.assigned_to ?? ""}
                onChange={(e) => onAssignedToChange(item.id, e.target.value)}
                placeholder="np. obrońcy / Kowalski"
                className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-2 py-1.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-emerald-600/50 dark:border-neutral-700 dark:bg-neutral-900"
              />
            </label>

            <label className="col-span-2 text-xs text-neutral-500 dark:text-neutral-500 sm:col-span-1">
              Sekcja
              <select
                value={item.section}
                onChange={(e) =>
                  onMoveToSection(item.id, e.target.value as WorkoutSection)
                }
                className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-2 py-1.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-emerald-600/50 dark:border-neutral-700 dark:bg-neutral-900"
              >
                {SECTION_ORDER.map((section) => (
                  <option key={section} value={section}>
                    {SECTION_LABELS[section]}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="shrink-0">
          {confirmingRemove ? (
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="rounded-full bg-red-600 px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-red-500"
              >
                Usuń
              </button>
              <button
                type="button"
                onClick={() => setConfirmingRemove(false)}
                className="rounded-full border border-neutral-300 px-2.5 py-1 text-xs font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
              >
                Anuluj
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmingRemove(true)}
              aria-label="Usuń ćwiczenie z treningu"
              className="rounded-full p-1.5 text-lg leading-none text-neutral-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
