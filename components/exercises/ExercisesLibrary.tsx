"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type {
  Category,
  Difficulty,
  ExerciseWithAuthor,
  Sport,
} from "@/lib/supabase/types";
import { DIFFICULTY_LABELS, DIFFICULTY_OPTIONS } from "@/lib/exercises";
import { ExerciseCard } from "./ExerciseCard";
import { ExerciseCardSkeleton } from "./ExerciseCardSkeleton";

const ALL = "all" as const;
const MINE = "mine" as const;

export function ExercisesLibrary({
  categories,
  sports,
  currentUserId,
}: {
  categories: Category[];
  sports: Sport[];
  currentUserId: string | null;
}) {
  const [exercises, setExercises] = useState<ExerciseWithAuthor[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);

  const [search, setSearch] = useState("");
  const [scopeFilter, setScopeFilter] = useState<typeof ALL | typeof MINE>(ALL);
  const [sportFilter, setSportFilter] = useState<number | typeof ALL>(ALL);
  const [categoryFilter, setCategoryFilter] = useState<number | typeof ALL>(
    ALL,
  );
  const [difficultyFilter, setDifficultyFilter] = useState<
    Difficulty | typeof ALL
  >(ALL);
  const [equipmentFilter, setEquipmentFilter] = useState<string>(ALL);

  useEffect(() => {
    let cancelled = false;
    setExercises(null);
    setLoadError(false);

    const supabase = createClient();
    supabase
      .from("exercises")
      .select("*, author:profiles(display_name)")
      .order("title", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error || !data) {
          setLoadError(true);
          return;
        }
        setExercises(data);
      });

    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  const categoriesById = useMemo(() => {
    const map = new Map<number, Category>();
    for (const category of categories) map.set(category.id, category);
    return map;
  }, [categories]);

  const sportsById = useMemo(() => {
    const map = new Map<number, Sport>();
    for (const sport of sports) map.set(sport.id, sport);
    return map;
  }, [sports]);

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
      if (scopeFilter === MINE && exercise.author_id !== currentUserId)
        return false;
      if (sportFilter !== ALL && exercise.sport_id !== sportFilter)
        return false;
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
  }, [
    exercises,
    search,
    scopeFilter,
    currentUserId,
    sportFilter,
    categoryFilter,
    difficultyFilter,
    equipmentFilter,
  ]);

  function clearAll() {
    setSearch("");
    setScopeFilter(ALL);
    setSportFilter(ALL);
    setCategoryFilter(ALL);
    setDifficultyFilter(ALL);
    setEquipmentFilter(ALL);
  }

  const activeFilters: Array<{ label: string; onClear: () => void }> = [];
  const trimmedSearch = search.trim();
  if (trimmedSearch) {
    activeFilters.push({
      label: `Szukaj: „${trimmedSearch}”`,
      onClear: () => setSearch(""),
    });
  }
  if (scopeFilter === MINE) {
    activeFilters.push({
      label: "Zakres: Moje",
      onClear: () => setScopeFilter(ALL),
    });
  }
  if (sportFilter !== ALL) {
    activeFilters.push({
      label: `Dyscyplina: ${sportsById.get(sportFilter)?.name_pl ?? sportFilter}`,
      onClear: () => setSportFilter(ALL),
    });
  }
  if (categoryFilter !== ALL) {
    activeFilters.push({
      label: `Kategoria: ${categoriesById.get(categoryFilter)?.name_pl ?? categoryFilter}`,
      onClear: () => setCategoryFilter(ALL),
    });
  }
  if (difficultyFilter !== ALL) {
    activeFilters.push({
      label: `Poziom: ${DIFFICULTY_LABELS[difficultyFilter]}`,
      onClear: () => setDifficultyFilter(ALL),
    });
  }
  if (equipmentFilter !== ALL) {
    activeFilters.push({
      label: `Sprzęt: ${equipmentFilter}`,
      onClear: () => setEquipmentFilter(ALL),
    });
  }

  return (
    <main className="mx-auto max-w-6xl px-6 pt-8 pb-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Biblioteka ćwiczeń
          </h1>
          <p className="mt-1 text-neutral-600 dark:text-neutral-400">
            Przeglądaj oficjalną bibliotekę, ćwiczenia innych trenerów i twórz
            własne.
          </p>
        </div>
        <Link
          href="/app/exercises/new"
          className="rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
        >
          Dodaj ćwiczenie
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        <div>
          <label
            htmlFor="exercise-search"
            className="block text-sm font-medium"
          >
            Szukaj
          </label>
          <input
            id="exercise-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Szukaj po nazwie lub opisie…"
            className="mt-1.5 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-emerald-600/50 dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <FilterSelect
            id="scope-filter"
            label="Zakres"
            value={scopeFilter}
            onChange={(value) => setScopeFilter(value === MINE ? MINE : ALL)}
            options={[
              { value: ALL, label: "Wszystkie" },
              { value: MINE, label: "Moje" },
            ]}
          />
          <FilterSelect
            id="sport-filter"
            label="Dyscyplina"
            value={sportFilter === ALL ? ALL : String(sportFilter)}
            onChange={(value) =>
              setSportFilter(value === ALL ? ALL : Number(value))
            }
            options={[
              { value: ALL, label: "Wszystkie dyscypliny" },
              ...sports.map((s) => ({ value: String(s.id), label: s.name_pl })),
            ]}
          />
          <FilterSelect
            id="category-filter"
            label="Kategoria"
            value={categoryFilter === ALL ? ALL : String(categoryFilter)}
            onChange={(value) =>
              setCategoryFilter(value === ALL ? ALL : Number(value))
            }
            options={[
              { value: ALL, label: "Wszystkie kategorie" },
              ...categories.map((c) => ({
                value: String(c.id),
                label: c.name_pl,
              })),
            ]}
          />
          <FilterSelect
            id="difficulty-filter"
            label="Poziom"
            value={difficultyFilter === ALL ? ALL : String(difficultyFilter)}
            onChange={(value) =>
              setDifficultyFilter(
                value === ALL ? ALL : (Number(value) as Difficulty),
              )
            }
            options={[
              { value: ALL, label: "Wszystkie poziomy" },
              ...DIFFICULTY_OPTIONS.map((d) => ({
                value: String(d),
                label: `${d} – ${DIFFICULTY_LABELS[d]}`,
              })),
            ]}
          />
          <FilterSelect
            id="equipment-filter"
            label="Sprzęt"
            value={equipmentFilter}
            onChange={setEquipmentFilter}
            options={[
              { value: ALL, label: "Wszystkie" },
              ...equipmentOptions.map((item) => ({ value: item, label: item })),
            ]}
          />
        </div>

        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {activeFilters.map((filter) => (
              <button
                key={filter.label}
                type="button"
                onClick={filter.onClear}
                className="inline-flex items-center gap-1 rounded-full border border-neutral-300 px-2.5 py-1 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-900"
              >
                {filter.label}
                <span aria-hidden="true">×</span>
              </button>
            ))}
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-medium text-emerald-600 hover:text-emerald-500"
            >
              Wyczyść filtry
            </button>
          </div>
        )}
      </div>

      <div className="mt-8">
        {loadError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/40">
            <p className="text-sm text-red-700 dark:text-red-400">
              Nie udało się wczytać ćwiczeń. Spróbuj ponownie.
            </p>
            <button
              type="button"
              onClick={() => setReloadToken((n) => n + 1)}
              className="mt-3 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500"
            >
              Spróbuj ponownie
            </button>
          </div>
        ) : exercises === null ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <ExerciseCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 p-8 text-center dark:border-neutral-800">
            <p className="text-neutral-600 dark:text-neutral-400">
              {exercises.length === 0
                ? "Nie znaleziono żadnych ćwiczeń."
                : "Brak ćwiczeń spełniających kryteria — spróbuj wyczyścić filtry."}
            </p>
            {activeFilters.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="mt-3 text-sm font-medium text-emerald-600 hover:text-emerald-500"
              >
                Wyczyść filtry
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                category={categoriesById.get(exercise.category_id)}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function FilterSelect({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  const isActive = value !== ALL;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1.5 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-emerald-600/50 dark:bg-neutral-900 ${
          isActive
            ? "border-emerald-600/50"
            : "border-neutral-300 dark:border-neutral-700"
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
