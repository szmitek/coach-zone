"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Play, PlayUnit } from "@/lib/supabase/types";
import { UNIT_LABELS, UNIT_OPTIONS, canDeletePlay } from "@/lib/plays";
import { DeletePlayButton } from "./DeletePlayButton";
import { UnitBadge } from "./UnitBadge";

const ALL = "all" as const;

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

function DiagramIndicator({ hasDiagram }: { hasDiagram: boolean }) {
  return (
    <span
      className="inline-flex h-5 w-5 shrink-0 items-center justify-center"
      title={hasDiagram ? "Ma diagram" : "Bez diagramu"}
    >
      {hasDiagram ? (
        <svg
          viewBox="0 0 20 20"
          className="h-4 w-4 text-emerald-600 dark:text-emerald-500"
        >
          <rect
            x="2"
            y="3"
            width="16"
            height="14"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="7" cy="8" r="1.4" fill="currentColor" />
          <path
            d="M6 14l3-3 2 2 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <span className="text-sm text-neutral-300 dark:text-neutral-700">
          —
        </span>
      )}
      <span className="sr-only">
        {hasDiagram ? "Ma diagram" : "Bez diagramu"}
      </span>
    </span>
  );
}

export function PlaysList() {
  const [plays, setPlays] = useState<Play[] | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [headCoachTeamIds, setHeadCoachTeamIds] = useState<Set<string>>(
    new Set(),
  );
  const [loadError, setLoadError] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);

  const [unitFilter, setUnitFilter] = useState<PlayUnit | typeof ALL>(ALL);
  const [formationFilter, setFormationFilter] = useState<string>(ALL);

  useEffect(() => {
    let cancelled = false;
    setPlays(null);
    setLoadError(false);

    const supabase = createClient();

    async function load() {
      const [{ data: userData }, { data: playsData, error: playsError }] =
        await Promise.all([
          supabase.auth.getUser(),
          // RLS (plays_select) already scopes this to the caller's own plays
          // plus their teams' - no client-side team filtering on top, same
          // as workouts (see WorkoutsList).
          supabase
            .from("plays")
            .select("*")
            .order("play_number", { ascending: true, nullsFirst: false }),
        ]);

      if (cancelled) return;
      if (playsError || !playsData) {
        setLoadError(true);
        return;
      }
      setCurrentUserId(userData.user?.id ?? null);

      const { data: membershipsData } = userData.user
        ? await supabase
            .from("team_members")
            .select("team_id, role")
            .eq("user_id", userData.user.id)
        : { data: [] };

      if (cancelled) return;

      setHeadCoachTeamIds(
        new Set(
          (membershipsData ?? [])
            .filter((m) => m.role === "head_coach")
            .map((m) => m.team_id),
        ),
      );
      setPlays(playsData);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  const formationOptions = useMemo(() => {
    const values = new Set<string>();
    for (const play of plays ?? []) {
      if (play.formation) values.add(play.formation);
    }
    return Array.from(values).sort((a, b) => a.localeCompare(b, "pl"));
  }, [plays]);

  const filtered = useMemo(() => {
    return (plays ?? []).filter((play) => {
      if (unitFilter !== ALL && play.unit !== unitFilter) return false;
      if (formationFilter !== ALL && play.formation !== formationFilter)
        return false;
      return true;
    });
  }, [plays, unitFilter, formationFilter]);

  function handleDeleted(id: string) {
    setPlays((prev) => prev?.filter((play) => play.id !== id) ?? prev);
  }

  const activeFilters: Array<{ label: string; onClear: () => void }> = [];
  if (unitFilter !== ALL) {
    activeFilters.push({
      label: `Jednostka: ${UNIT_LABELS[unitFilter]}`,
      onClear: () => setUnitFilter(ALL),
    });
  }
  if (formationFilter !== ALL) {
    activeFilters.push({
      label: `Formacja: ${formationFilter}`,
      onClear: () => setFormationFilter(ALL),
    });
  }

  return (
    <main className="mx-auto max-w-5xl px-6 pt-8 pb-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Zagrywki</h1>
          <p className="mt-1 text-neutral-600 dark:text-neutral-400">
            Playbook — twoje zagrywki i zagrywki aktywnej drużyny.
          </p>
        </div>
        <Link
          href="/app/plays/new"
          className="rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
        >
          Nowa zagrywka
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <FilterSelect
            id="unit-filter"
            label="Jednostka"
            value={unitFilter}
            onChange={(value) =>
              setUnitFilter(value === ALL ? ALL : (value as PlayUnit))
            }
            options={[
              { value: ALL, label: "Wszystkie jednostki" },
              ...UNIT_OPTIONS.map((unit) => ({
                value: unit,
                label: UNIT_LABELS[unit],
              })),
            ]}
          />
          {formationOptions.length > 0 && (
            <FilterSelect
              id="formation-filter"
              label="Formacja"
              value={formationFilter}
              onChange={setFormationFilter}
              options={[
                { value: ALL, label: "Wszystkie formacje" },
                ...formationOptions.map((formation) => ({
                  value: formation,
                  label: formation,
                })),
              ]}
            />
          )}
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
              onClick={() => {
                setUnitFilter(ALL);
                setFormationFilter(ALL);
              }}
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
              Nie udało się wczytać zagrywek. Spróbuj ponownie.
            </p>
            <button
              type="button"
              onClick={() => setReloadToken((n) => n + 1)}
              className="mt-3 rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500"
            >
              Spróbuj ponownie
            </button>
          </div>
        ) : plays === null ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className="h-14 animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-900"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 p-8 text-center dark:border-neutral-800">
            <p className="text-neutral-600 dark:text-neutral-400">
              {plays.length === 0
                ? "Nie masz jeszcze żadnych zagrywek — utwórz pierwszą."
                : "Brak zagrywek spełniających kryteria — spróbuj wyczyścić filtry."}
            </p>
            {plays.length === 0 ? (
              <Link
                href="/app/plays/new"
                className="mt-3 inline-block text-sm font-medium text-emerald-600 hover:text-emerald-500"
              >
                Utwórz pierwszą zagrywkę →
              </Link>
            ) : (
              activeFilters.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setUnitFilter(ALL);
                    setFormationFilter(ALL);
                  }}
                  className="mt-3 text-sm font-medium text-emerald-600 hover:text-emerald-500"
                >
                  Wyczyść filtry
                </button>
              )
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((play) => (
              <div
                key={play.id}
                className="flex items-center gap-3 rounded-xl border border-neutral-200 pr-3 transition-colors hover:border-emerald-600/50 dark:border-neutral-800"
              >
                <Link
                  href={`/app/plays/${play.id}`}
                  className="flex min-w-0 flex-1 items-center gap-4 rounded-lg px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/50"
                >
                  <span className="w-8 shrink-0 text-right font-mono text-sm text-neutral-500 dark:text-neutral-500">
                    {play.play_number ?? "—"}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-semibold tracking-tight">
                    {play.name}
                  </span>
                  <UnitBadge unit={play.unit} />
                  <span className="hidden w-32 shrink-0 truncate text-sm text-neutral-600 dark:text-neutral-400 sm:block">
                    {play.formation || "—"}
                  </span>
                  <DiagramIndicator hasDiagram={play.board_state !== null} />
                </Link>
                {canDeletePlay({
                  ownerId: play.owner_id,
                  teamId: play.team_id,
                  currentUserId,
                  isHeadCoach:
                    play.team_id !== null && headCoachTeamIds.has(play.team_id),
                }) && (
                  <DeletePlayButton
                    playId={play.id}
                    onDeleted={() => handleDeleted(play.id)}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
