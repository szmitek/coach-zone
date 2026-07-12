"use client";

import { useEffect, useMemo, useState } from "react";
import { AuthorBadge } from "@/components/exercises/AuthorBadge";
import { CategoryBadge } from "@/components/exercises/CategoryBadge";
import { DifficultyIndicator } from "@/components/exercises/DifficultyIndicator";
import {
  DIFFICULTY_LABELS,
  DIFFICULTY_OPTIONS,
  formatDuration,
} from "@/lib/exercises";
import { SECTION_LABELS } from "@/lib/workouts";
import type {
  Category,
  Difficulty,
  Exercise,
  PublicProfile,
  WorkoutSection,
} from "@/lib/supabase/types";

const ALL = "all" as const;

export function ExercisePicker({
  section,
  exercises,
  loadError,
  categories,
  authorsById,
  currentUserId,
  onAdd,
  onClose,
}: {
  section: WorkoutSection;
  exercises: Exercise[] | null;
  loadError: boolean;
  categories: Category[];
  authorsById: Map<string, PublicProfile>;
  currentUserId: string | null | undefined;
  onAdd: (exercise: Exercise) => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<number | typeof ALL>(
    ALL,
  );
  const [difficultyFilter, setDifficultyFilter] = useState<
    Difficulty | typeof ALL
  >(ALL);
  const [equipmentFilter, setEquipmentFilter] = useState<string>(ALL);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const categoriesById = useMemo(() => {
    const map = new Map<number, Category>();
    for (const category of categories) map.set(category.id, category);
    return map;
  }, [categories]);

  const equipmentOptions = useMemo(() => {
    const values = new Set<string>();
    for (const exercise of exercises ?? []) {
      for (const item of exercise.equipment) values.add(item);
    }
    return Array.from(values).sort((a, b) => a.localeCompare(b, "pl"));
  }, [exercises]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (exercises ?? []).filter((exercise) => {
      if (query) {
        const haystack =
          `${exercise.title} ${exercise.description ?? ""}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      if (categoryFilter !== ALL && exercise.category_id !== categoryFilter)
        return false;
      if (difficultyFilter !== ALL && exercise.difficulty !== difficultyFilter)
        return false;
      if (
        equipmentFilter !== ALL &&
        !exercise.equipment.includes(equipmentFilter)
      ) {
        return false;
      }
      return true;
    });
  }, [exercises, search, categoryFilter, difficultyFilter, equipmentFilter]);

  function handleAdd(exercise: Exercise) {
    onAdd(exercise);
    setJustAddedId(exercise.id);
    setTimeout(() => {
      setJustAddedId((current) => (current === exercise.id ? null : current));
    }, 1200);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="exercise-picker-title"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[85vh] w-full max-w-2xl flex-col rounded-2xl bg-white p-6 dark:bg-neutral-900"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="exercise-picker-title"
              className="text-lg font-semibold tracking-tight"
            >
              Dodaj ćwiczenie
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Sekcja: {SECTION_LABELS[section]}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Zamknij"
            className="shrink-0 rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
          >
            ×
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Szukaj po nazwie lub opisie…"
            aria-label="Szukaj ćwiczeń"
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-emerald-600/50 dark:border-neutral-700 dark:bg-neutral-900"
          />

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <select
              aria-label="Kategoria"
              value={categoryFilter === ALL ? ALL : String(categoryFilter)}
              onChange={(e) =>
                setCategoryFilter(
                  e.target.value === ALL ? ALL : Number(e.target.value),
                )
              }
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-emerald-600/50 dark:border-neutral-700 dark:bg-neutral-900"
            >
              <option value={ALL}>Wszystkie kategorie</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name_pl}
                </option>
              ))}
            </select>

            <select
              aria-label="Poziom trudności"
              value={difficultyFilter === ALL ? ALL : String(difficultyFilter)}
              onChange={(e) =>
                setDifficultyFilter(
                  e.target.value === ALL
                    ? ALL
                    : (Number(e.target.value) as Difficulty),
                )
              }
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-emerald-600/50 dark:border-neutral-700 dark:bg-neutral-900"
            >
              <option value={ALL}>Wszystkie poziomy</option>
              {DIFFICULTY_OPTIONS.map((d) => (
                <option key={d} value={d}>
                  {d} – {DIFFICULTY_LABELS[d]}
                </option>
              ))}
            </select>

            <select
              aria-label="Sprzęt"
              value={equipmentFilter}
              onChange={(e) => setEquipmentFilter(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-emerald-600/50 dark:border-neutral-700 dark:bg-neutral-900"
            >
              <option value={ALL}>Wszystkie</option>
              {equipmentOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 min-h-0 flex-1 overflow-y-auto">
          {loadError ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/50 dark:bg-red-950/40">
              <p className="text-sm text-red-700 dark:text-red-400">
                Nie udało się wczytać biblioteki ćwiczeń.
              </p>
            </div>
          ) : exercises === null ? (
            <div className="space-y-2">
              {Array.from({ length: 4 }, (_, i) => (
                <div
                  key={i}
                  className="h-16 animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-800"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="rounded-xl border border-neutral-200 p-6 text-center text-sm text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
              Brak ćwiczeń spełniających kryteria.
            </p>
          ) : (
            <ul className="space-y-2">
              {filtered.map((exercise) => {
                const category = categoriesById.get(exercise.category_id);
                return (
                  <li
                    key={exercise.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 p-3 dark:border-neutral-800"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {exercise.title}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        {category && (
                          <CategoryBadge
                            name={category.name_pl}
                            slug={category.slug}
                          />
                        )}
                        <DifficultyIndicator difficulty={exercise.difficulty} />
                        <span className="text-xs text-neutral-500 dark:text-neutral-500">
                          {formatDuration(exercise.duration_min)}
                        </span>
                        <AuthorBadge
                          authorId={exercise.author_id}
                          currentUserId={currentUserId}
                          authorsById={authorsById}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAdd(exercise)}
                      className="shrink-0 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-emerald-500"
                    >
                      {justAddedId === exercise.id ? "Dodano ✓" : "Dodaj"}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
