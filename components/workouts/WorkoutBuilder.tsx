"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type {
  Category,
  Exercise,
  Workout,
  WorkoutItem,
  WorkoutSection,
} from "@/lib/supabase/types";
import {
  DEFAULT_ITEM_DURATION_MIN,
  SECTION_LABELS,
  SECTION_ORDER,
  formatScheduledDate,
  formatTotalDuration,
  nextPosition,
  type SaveState,
} from "@/lib/workouts";
import { DeleteWorkoutButton } from "./DeleteWorkoutButton";
import { DownloadPdfButton } from "./DownloadPdfButton";
import { ExercisePicker } from "./ExercisePicker";
import { SaveIndicator } from "./SaveIndicator";
import { ShareWorkoutButton } from "./ShareWorkoutButton";
import { WorkoutBasicsForm } from "./WorkoutBasicsForm";
import { WorkoutSectionColumn } from "./WorkoutSectionColumn";

export function WorkoutBuilder({
  initialWorkout,
  initialItems,
  initialExercisesById,
  categories,
}: {
  initialWorkout: Workout;
  initialItems: WorkoutItem[];
  initialExercisesById: Record<string, Exercise>;
  categories: Category[];
}) {
  const router = useRouter();

  const [workout, setWorkout] = useState(initialWorkout);
  const [items, setItems] = useState<WorkoutItem[]>(initialItems);
  const [exercisesById, setExercisesById] = useState(initialExercisesById);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [editingBasics, setEditingBasics] = useState(false);
  const [pickerSection, setPickerSection] = useState<WorkoutSection | null>(
    null,
  );

  const [libraryExercises, setLibraryExercises] = useState<Exercise[] | null>(
    null,
  );
  const [libraryError, setLibraryError] = useState(false);

  const debounceTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  useEffect(() => {
    const timers = debounceTimers.current;
    return () => {
      for (const timer of timers.values()) clearTimeout(timer);
    };
  }, []);

  // Preloaded once so reopening the picker for another section is instant.
  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();
    supabase
      .from("exercises")
      .select("*")
      .order("title", { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error || !data) {
          setLibraryError(true);
          return;
        }
        setLibraryExercises(data);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const itemsBySection = useMemo(() => {
    const map = new Map<WorkoutSection, WorkoutItem[]>();
    for (const section of SECTION_ORDER) map.set(section, []);
    for (const item of items) map.get(item.section)?.push(item);
    for (const section of SECTION_ORDER) {
      map.get(section)?.sort((a, b) => a.position - b.position);
    }
    return map;
  }, [items]);

  const categoriesById = useMemo(() => {
    const map = new Map<number, Category>();
    for (const category of categories) map.set(category.id, category);
    return map;
  }, [categories]);

  const totalDuration = useMemo(
    () => items.reduce((sum, item) => sum + (item.duration_min ?? 0), 0),
    [items],
  );

  const pdfItems = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        section: item.section,
        position: item.position,
        duration_min: item.duration_min,
        assigned_to: item.assigned_to,
        exerciseTitle:
          exercisesById[item.exercise_id]?.title ?? "Ćwiczenie niedostępne",
        exerciseDescription:
          exercisesById[item.exercise_id]?.description ?? null,
      })),
    [items, exercisesById],
  );

  // Optimistic-update helper shared by every mutation: apply the new items
  // array immediately, persist in the background, and roll back to the
  // pre-mutation snapshot if the write fails so the UI never shows state
  // that isn't actually saved.
  async function applyMutation(
    nextItems: WorkoutItem[],
    persist: () => Promise<{ error: unknown }>,
  ) {
    const previousItems = items;
    setItems(nextItems);
    setSaveState("saving");
    const { error } = await persist();
    if (error) {
      setItems(previousItems);
      setSaveState("error");
      return;
    }
    setSaveState("saved");
  }

  async function handleAddExercise(
    section: WorkoutSection,
    exercise: Exercise,
  ) {
    const sectionItems = itemsBySection.get(section) ?? [];
    const newItem: WorkoutItem = {
      id: crypto.randomUUID(),
      workout_id: workout.id,
      exercise_id: exercise.id,
      section,
      position: nextPosition(sectionItems),
      duration_min: exercise.duration_min ?? DEFAULT_ITEM_DURATION_MIN,
      assigned_to: null,
    };

    setExercisesById((prev) => ({ ...prev, [exercise.id]: exercise }));

    await applyMutation([...items, newItem], async () => {
      const supabase = createClient();
      const { error } = await supabase.from("workout_items").insert(newItem);
      return { error };
    });
  }

  async function handleRemoveItem(itemId: string) {
    await applyMutation(
      items.filter((item) => item.id !== itemId),
      async () => {
        const supabase = createClient();
        const { error } = await supabase
          .from("workout_items")
          .delete()
          .eq("id", itemId);
        return { error };
      },
    );
  }

  async function handleReorderSection(
    section: WorkoutSection,
    activeId: string,
    overId: string,
  ) {
    const sectionItems = itemsBySection.get(section) ?? [];
    const oldIndex = sectionItems.findIndex((item) => item.id === activeId);
    const newIndex = sectionItems.findIndex((item) => item.id === overId);
    if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

    const reordered = [...sectionItems];
    const [moved] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, moved);
    const renumbered = reordered.map((item, index) => ({
      ...item,
      position: index,
    }));

    const otherItems = items.filter((item) => item.section !== section);

    await applyMutation([...otherItems, ...renumbered], async () => {
      const supabase = createClient();
      const results = await Promise.all(
        renumbered.map((item) =>
          supabase
            .from("workout_items")
            .update({ position: item.position })
            .eq("id", item.id),
        ),
      );
      const failed = results.find((result) => result.error);
      return { error: failed?.error ?? null };
    });
  }

  async function handleMoveToSection(
    itemId: string,
    newSection: WorkoutSection,
  ) {
    const item = items.find((i) => i.id === itemId);
    if (!item || item.section === newSection) return;

    const destItems = itemsBySection.get(newSection) ?? [];
    const position = nextPosition(destItems);
    const nextItems = items.map((i) =>
      i.id === itemId ? { ...i, section: newSection, position } : i,
    );

    await applyMutation(nextItems, async () => {
      const supabase = createClient();
      const { error } = await supabase
        .from("workout_items")
        .update({ section: newSection, position })
        .eq("id", itemId);
      return { error };
    });
  }

  function scheduleFieldSave(
    itemId: string,
    field: "duration_min" | "assigned_to",
    patch: Partial<Pick<WorkoutItem, "duration_min" | "assigned_to">>,
  ) {
    const key = `${itemId}-${field}`;
    const existing = debounceTimers.current.get(key);
    if (existing) clearTimeout(existing);

    const timer = setTimeout(async () => {
      setSaveState("saving");
      const supabase = createClient();
      const { error } = await supabase
        .from("workout_items")
        .update(patch)
        .eq("id", itemId);
      setSaveState(error ? "error" : "saved");
    }, 500);
    debounceTimers.current.set(key, timer);
  }

  function handleDurationChange(itemId: string, rawValue: string) {
    if (rawValue === "") {
      setItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, duration_min: null } : item,
        ),
      );
      scheduleFieldSave(itemId, "duration_min", { duration_min: null });
      return;
    }
    const parsed = Number(rawValue);
    // duration_min is a Postgres integer column - a fractional value here
    // would round-trip fine through JS but fail the write with a cast error.
    if (!Number.isInteger(parsed) || parsed < 0) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, duration_min: parsed } : item,
      ),
    );
    scheduleFieldSave(itemId, "duration_min", { duration_min: parsed });
  }

  function handleAssignedToChange(itemId: string, value: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, assigned_to: value } : item,
      ),
    );
    scheduleFieldSave(itemId, "assigned_to", {
      assigned_to: value.trim() || null,
    });
  }

  function handleBasicsSaved(updated: Workout) {
    setWorkout(updated);
    setEditingBasics(false);
  }

  function handleWorkoutDeleted() {
    router.push("/app/workouts");
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-6xl px-6 pt-8 pb-24">
      <Link
        href="/app/workouts"
        className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
      >
        ← Wszystkie treningi
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          {editingBasics ? (
            <div className="max-w-md">
              <WorkoutBasicsForm
                mode="edit"
                workout={workout}
                onSaved={handleBasicsSaved}
                onCancel={() => setEditingBasics(false)}
              />
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold tracking-tight">
                {workout.title}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                {workout.team_name && <span>{workout.team_name}</span>}
                <span>{formatScheduledDate(workout.scheduled_for)}</span>
              </div>
              {workout.notes && (
                <p className="mt-3 max-w-2xl whitespace-pre-line text-sm text-neutral-600 dark:text-neutral-400">
                  {workout.notes}
                </p>
              )}
              <button
                type="button"
                onClick={() => setEditingBasics(true)}
                className="mt-3 text-sm font-medium text-emerald-600 hover:text-emerald-500"
              >
                Edytuj szczegóły
              </button>
            </>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-3">
          <SaveIndicator state={saveState} />
          <div className="flex flex-wrap items-start justify-end gap-2">
            <DownloadPdfButton workout={workout} items={pdfItems} />
            <ShareWorkoutButton shareId={workout.share_id} />
            <DeleteWorkoutButton
              workoutId={workout.id}
              onDeleted={handleWorkoutDeleted}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 rounded-2xl border border-neutral-200 px-5 py-4 text-sm dark:border-neutral-800">
        <span className="font-semibold">
          Łączny czas: {formatTotalDuration(totalDuration)}
        </span>
        {SECTION_ORDER.map((section) => (
          <span
            key={section}
            className="text-neutral-600 dark:text-neutral-400"
          >
            {SECTION_LABELS[section]}:{" "}
            {itemsBySection.get(section)?.length ?? 0}
          </span>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {SECTION_ORDER.map((section) => (
          <WorkoutSectionColumn
            key={section}
            section={section}
            items={itemsBySection.get(section) ?? []}
            exercisesById={exercisesById}
            categoriesById={categoriesById}
            onReorder={(activeId, overId) =>
              handleReorderSection(section, activeId, overId)
            }
            onDurationChange={handleDurationChange}
            onAssignedToChange={handleAssignedToChange}
            onMoveToSection={handleMoveToSection}
            onRemove={handleRemoveItem}
            onOpenPicker={() => setPickerSection(section)}
          />
        ))}
      </div>

      {pickerSection && (
        <ExercisePicker
          key={pickerSection}
          section={pickerSection}
          exercises={libraryExercises}
          loadError={libraryError}
          categories={categories}
          onAdd={(exercise) => handleAddExercise(pickerSection, exercise)}
          onClose={() => setPickerSection(null)}
        />
      )}
    </main>
  );
}
