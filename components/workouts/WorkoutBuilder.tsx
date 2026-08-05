"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { createMutationQueue } from "@/lib/mutationQueue";
import type {
  Category,
  Exercise,
  PublicProfile,
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
  currentUserId,
  canDelete,
}: {
  initialWorkout: Workout;
  initialItems: WorkoutItem[];
  initialExercisesById: Record<string, Exercise>;
  categories: Category[];
  currentUserId: string;
  /** Owner or team head coach only - narrower than who can edit, so it's
   *  computed server-side (see app/app/workouts/[id]/page.tsx) rather than
   *  guessed here from role data this component doesn't otherwise need. */
  canDelete: boolean;
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
  // Once a save is refused for being stale, stop offering more local edits
  // to react to - every subsequent attempt would just refuse again, and the
  // coach's only real way forward is to see what actually changed.
  const [conflict, setConflict] = useState(false);

  const [libraryExercises, setLibraryExercises] = useState<Exercise[] | null>(
    null,
  );
  const [libraryError, setLibraryError] = useState(false);
  const [authors, setAuthors] = useState<PublicProfile[]>([]);

  const debounceTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  // Live mirrors of `workout`/`items`, read by the claim/resync/mutation
  // logic below instead of the state variables directly. A mutation queued
  // behind another one (see mutationQueue below) can execute long after the
  // click that queued it - by then `workout`/`items` may have moved on via
  // the earlier mutation's own claim + resync. Reading the closure captured
  // at click time would see the version as of that click, not as of now,
  // which is the same self-collision the queue exists to close, just moved
  // one level up. Updated in lockstep with every state write below so they
  // never lag behind the state they mirror.
  const workoutRef = useRef(initialWorkout);
  const itemsRef = useRef(initialItems);

  function updateWorkout(updater: (prev: Workout) => Workout) {
    workoutRef.current = updater(workoutRef.current);
    setWorkout(workoutRef.current);
  }

  function updateItems(updater: (prev: WorkoutItem[]) => WorkoutItem[]) {
    itemsRef.current = updater(itemsRef.current);
    setItems(itemsRef.current);
  }

  // Every workout_items mutation (add/remove/reorder/move-section, plus the
  // debounced duration/assigned_to edits below) claims workouts.updated_at,
  // writes, then resyncs the claimed version - three round trips that must
  // never interleave with another mutation's. Two claims racing the same
  // pre-write version both look valid individually; whichever commits
  // second bumps updated_at out from under the first the moment its own
  // item write's trigger lands, so whichever resync (or next claim) reads
  // last sees a version that's already moved on - a conflict against no one
  // but this same coach's own prior save. Queuing every mutation onto one
  // chain means each one's resync has fully landed - and workoutRef/itemsRef
  // fully caught up - before the next one's claim ever reads them.
  const enqueueMutation = useRef(createMutationQueue()).current;

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

  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();
    supabase.rpc("list_public_profiles").then(({ data }) => {
      if (!cancelled && data) setAuthors(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const authorsById = useMemo(() => {
    const map = new Map<string, PublicProfile>();
    for (const author of authors) map.set(author.id, author);
    return map;
  }, [authors]);

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
        exerciseSteps: exercisesById[item.exercise_id]?.steps ?? [],
        exerciseEquipment: exercisesById[item.exercise_id]?.equipment ?? [],
        exerciseMediaUrl: exercisesById[item.exercise_id]?.media_url ?? null,
      })),
    [items, exercisesById],
  );

  // workouts.updated_at is a version marker for the whole plan, not just its
  // own row - a trigger bumps it on every workout_items insert/update/delete
  // too (see supabase/migrations/20260730100952_workout_items_touch_parent.sql).
  // Claimed atomically immediately before every item write, the same way
  // WorkoutBasicsForm claims it for a basics edit: a conditional update
  // (.eq("updated_at", known)) rather than a separate read-then-compare.
  // A plain read-then-compare leaves a gap between "checked" and "wrote"
  // that a second tab's save can land in - two coaches autosaving close
  // together could each pass the check before either write lands, which is
  // exactly the silent-clobber the versioning migration exists to prevent.
  // Folding the check into the write itself closes that gap: at most one
  // concurrent claim can match a given updated_at, because Postgres
  // serializes concurrent updates to the same row. 0 rows back (no error)
  // means someone else's edit already moved the version on. Also stamps
  // last_edited_by, since claiming the version and attributing the change
  // are naturally the same write.
  async function claimWorkoutVersion(
    supabase: ReturnType<typeof createClient>,
  ): Promise<boolean> {
    const { data, error } = await supabase
      .from("workouts")
      .update({ last_edited_by: currentUserId })
      .eq("id", workoutRef.current.id)
      .eq("updated_at", workoutRef.current.updated_at)
      .select("updated_at, last_edited_by")
      .maybeSingle();
    if (error || !data) {
      setConflict(true);
      return false;
    }
    updateWorkout((prev) => ({ ...prev, ...data }));
    return true;
  }

  // Runs after a workout_items write that already succeeded - the same
  // touch_parent_workout trigger fires on that write too, so the version
  // claimWorkoutVersion just staked is already behind again by the time it
  // lands. Resyncs the local baseline so the coach's own very next save
  // doesn't look stale against no one's changes but their own; never a
  // reason to roll back the mutation that already landed.
  //
  // This SELECT isn't atomic with the write that provoked it, so it can
  // land after a foreign session's own claim+write has slipped into the
  // gap in between - and updated_at alone can't tell "moved because of my
  // write" from "moved because of my write, then someone else's too".
  // last_edited_by can: only a claim ever sets it, every claim stamps the
  // claimant, and nothing else touches it in that gap. If it's not still
  // us, a foreign claim landed here first. Adopt the name for display, but
  // deliberately leave the baseline (workoutRef.current.updated_at) at
  // whatever claimWorkoutVersion last staked - the same shape a rejected
  // claim already leaves it in - so this session's next claim attempt
  // keeps failing until a reload brings `items` back in sync with the row,
  // instead of quietly re-arming on a version we never actually saw.
  async function resyncWorkoutVersion(
    supabase: ReturnType<typeof createClient>,
  ) {
    const { data } = await supabase
      .from("workouts")
      .select("updated_at, last_edited_by")
      .eq("id", workoutRef.current.id)
      .single();
    if (!data) return;
    if (data.last_edited_by !== currentUserId) {
      updateWorkout((prev) => ({
        ...prev,
        last_edited_by: data.last_edited_by,
      }));
      setConflict(true);
      return;
    }
    updateWorkout((prev) => ({ ...prev, updated_at: data.updated_at }));
  }

  // Optimistic-update helper shared by every item mutation: apply the new
  // items array immediately, persist in the background, and roll back to
  // the pre-mutation snapshot if the write fails so the UI never shows
  // state that isn't actually saved. Queued (see enqueueMutation above) and
  // fed `itemsRef.current` rather than a snapshot the caller computed at
  // click time, so a mutation queued behind another always builds on that
  // one's result instead of clobbering it.
  function applyMutation(
    computeNextItems: (current: WorkoutItem[]) => WorkoutItem[],
    persist: () => Promise<{ error: unknown }>,
  ): Promise<void> {
    return enqueueMutation(async () => {
      const supabase = createClient();
      if (!(await claimWorkoutVersion(supabase))) return;

      const previousItems = itemsRef.current;
      updateItems(computeNextItems);
      setSaveState("saving");
      const { error } = await persist();
      if (error) {
        updateItems(() => previousItems);
        setSaveState("error");
        return;
      }
      await resyncWorkoutVersion(supabase);
      setSaveState("saved");
    });
  }

  async function handleAddExercise(
    section: WorkoutSection,
    exercise: Exercise,
  ) {
    setExercisesById((prev) => ({ ...prev, [exercise.id]: exercise }));

    // Built once computeNextItems actually runs (queue permitting), so its
    // position is based on this section as of then, not as of the click -
    // see applyMutation.
    let newItem!: WorkoutItem;
    await applyMutation(
      (current) => {
        const sectionItems = current.filter((item) => item.section === section);
        newItem = {
          id: crypto.randomUUID(),
          workout_id: workoutRef.current.id,
          exercise_id: exercise.id,
          section,
          position: nextPosition(sectionItems),
          duration_min: exercise.duration_min ?? DEFAULT_ITEM_DURATION_MIN,
          assigned_to: null,
        };
        return [...current, newItem];
      },
      async () => {
        const supabase = createClient();
        const { error } = await supabase.from("workout_items").insert(newItem);
        return { error };
      },
    );
  }

  async function handleRemoveItem(itemId: string) {
    await applyMutation(
      (current) => current.filter((item) => item.id !== itemId),
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
    // Populated by computeNextItems only when a reorder actually applies,
    // so persist can tell a real move from a same-position no-op.
    let renumbered: WorkoutItem[] = [];
    await applyMutation(
      (current) => {
        const sectionItems = current
          .filter((item) => item.section === section)
          .sort((a, b) => a.position - b.position);
        const oldIndex = sectionItems.findIndex((item) => item.id === activeId);
        const newIndex = sectionItems.findIndex((item) => item.id === overId);
        if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
          return current;
        }

        const reordered = [...sectionItems];
        const [moved] = reordered.splice(oldIndex, 1);
        reordered.splice(newIndex, 0, moved);
        renumbered = reordered.map((item, index) => ({
          ...item,
          position: index,
        }));

        const otherItems = current.filter((item) => item.section !== section);
        return [...otherItems, ...renumbered];
      },
      async () => {
        if (renumbered.length === 0) return { error: null };
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
      },
    );
  }

  async function handleMoveToSection(
    itemId: string,
    newSection: WorkoutSection,
  ) {
    // Populated by computeNextItems only when the move actually applies, so
    // persist can tell a real move from an already-there no-op.
    let move: { section: WorkoutSection; position: number } | null = null;
    await applyMutation(
      (current) => {
        const item = current.find((i) => i.id === itemId);
        if (!item || item.section === newSection) return current;

        const destItems = current.filter((i) => i.section === newSection);
        const next = { section: newSection, position: nextPosition(destItems) };
        move = next;
        return current.map((i) => (i.id === itemId ? { ...i, ...next } : i));
      },
      async () => {
        if (!move) return { error: null };
        const supabase = createClient();
        const { error } = await supabase
          .from("workout_items")
          .update(move)
          .eq("id", itemId);
        return { error };
      },
    );
  }

  function scheduleFieldSave(
    itemId: string,
    field: "duration_min" | "assigned_to",
    patch: Partial<Pick<WorkoutItem, "duration_min" | "assigned_to">>,
  ) {
    const key = `${itemId}-${field}`;
    const existing = debounceTimers.current.get(key);
    if (existing) clearTimeout(existing);

    const timer = setTimeout(() => {
      enqueueMutation(async () => {
        const supabase = createClient();
        if (!(await claimWorkoutVersion(supabase))) return;

        setSaveState("saving");
        const { error } = await supabase
          .from("workout_items")
          .update(patch)
          .eq("id", itemId);
        if (error) {
          setSaveState("error");
          return;
        }
        await resyncWorkoutVersion(supabase);
        setSaveState("saved");
      });
    }, 500);
    debounceTimers.current.set(key, timer);
  }

  function handleDurationChange(itemId: string, rawValue: string) {
    if (rawValue === "") {
      updateItems((prev) =>
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
    updateItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, duration_min: parsed } : item,
      ),
    );
    scheduleFieldSave(itemId, "duration_min", { duration_min: parsed });
  }

  function handleAssignedToChange(itemId: string, value: string) {
    updateItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, assigned_to: value } : item,
      ),
    );
    scheduleFieldSave(itemId, "assigned_to", {
      assigned_to: value.trim() || null,
    });
  }

  function handleBasicsSaved(updated: Workout) {
    updateWorkout(() => updated);
    setEditingBasics(false);
  }

  function handleWorkoutDeleted() {
    router.push("/app/workouts");
    router.refresh();
  }

  // A hard reload, not router.refresh(): this component's own state (items,
  // workout) was seeded once from server props and never re-syncs itself
  // from a refetch, so a refresh would pull fresh data the page never
  // actually shows. The whole point here is showing the coach what's
  // actually there now.
  function handleReload() {
    window.location.reload();
  }

  const lastEditedByName =
    workout.last_edited_by === null
      ? null
      : workout.last_edited_by === currentUserId
        ? "Ty"
        : (authorsById.get(workout.last_edited_by)?.display_name ??
          "Inny trener");

  return (
    <main className="mx-auto max-w-5xl px-6 pt-8 pb-24">
      <Link
        href="/app/workouts"
        className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
      >
        ← Wszystkie treningi
      </Link>

      {conflict && (
        <div
          role="alert"
          className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-400"
        >
          <span>
            Ktoś inny zmienił ten plan w międzyczasie — Twoja ostatnia zmiana
            nie została zapisana, żeby jej nie nadpisać.
          </span>
          <button
            type="button"
            onClick={handleReload}
            className="shrink-0 rounded-full bg-amber-600 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-amber-500"
          >
            Odśwież
          </button>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          {editingBasics ? (
            <div className="max-w-md">
              <WorkoutBasicsForm
                mode="edit"
                workout={workout}
                currentUserId={currentUserId}
                onSaved={handleBasicsSaved}
                onConflict={() => {
                  setEditingBasics(false);
                  setConflict(true);
                }}
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
                {lastEditedByName && (
                  <span>Ostatnio zmienił: {lastEditedByName}</span>
                )}
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
            <Link
              href={`/app/workouts/${workout.id}/train`}
              className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
            >
              Rozpocznij trening
            </Link>
            <DownloadPdfButton workout={workout} items={pdfItems} />
            <ShareWorkoutButton shareId={workout.share_id} />
            {canDelete && (
              <DeleteWorkoutButton
                workoutId={workout.id}
                onDeleted={handleWorkoutDeleted}
              />
            )}
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
          authorsById={authorsById}
          currentUserId={currentUserId}
          onAdd={(exercise) => handleAddExercise(pickerSection, exercise)}
          onClose={() => setPickerSection(null)}
        />
      )}
    </main>
  );
}
