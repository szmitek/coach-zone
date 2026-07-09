"use client";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SECTION_HINTS, SECTION_LABELS } from "@/lib/workouts";
import type {
  Category,
  Exercise,
  WorkoutItem,
  WorkoutSection,
} from "@/lib/supabase/types";
import { WorkoutItemRow } from "./WorkoutItemRow";

export function WorkoutSectionColumn({
  section,
  items,
  exercisesById,
  categoriesById,
  onReorder,
  onDurationChange,
  onAssignedToChange,
  onMoveToSection,
  onRemove,
  onOpenPicker,
}: {
  section: WorkoutSection;
  items: WorkoutItem[];
  exercisesById: Record<string, Exercise>;
  categoriesById: Map<number, Category>;
  onReorder: (activeId: string, overId: string) => void;
  onDurationChange: (itemId: string, value: string) => void;
  onAssignedToChange: (itemId: string, value: string) => void;
  onMoveToSection: (itemId: string, section: WorkoutSection) => void;
  onRemove: (itemId: string) => void;
  onOpenPicker: () => void;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    onReorder(String(active.id), String(over.id));
  }

  const totalMinutes = items.reduce(
    (sum, item) => sum + (item.duration_min ?? 0),
    0,
  );

  return (
    <section className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold tracking-tight">
          {SECTION_LABELS[section]}
        </h2>
        <span className="text-xs text-neutral-500 dark:text-neutral-500">
          {items.length} · {totalMinutes} min
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {items.length === 0 ? (
          <p className="rounded-xl border border-dashed border-neutral-300 px-4 py-6 text-center text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-500">
            {SECTION_HINTS[section]}
          </p>
        ) : (
          <DndContext
            id={`workout-section-${section}`}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {items.map((item) => (
                <WorkoutItemRow
                  key={item.id}
                  item={item}
                  exercise={exercisesById[item.exercise_id]}
                  category={
                    exercisesById[item.exercise_id]
                      ? categoriesById.get(
                          exercisesById[item.exercise_id].category_id,
                        )
                      : undefined
                  }
                  onDurationChange={onDurationChange}
                  onAssignedToChange={onAssignedToChange}
                  onMoveToSection={onMoveToSection}
                  onRemove={onRemove}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>

      <button
        type="button"
        onClick={onOpenPicker}
        className="mt-4 w-full rounded-full border border-dashed border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:border-emerald-600/50 hover:text-emerald-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-emerald-600/50 dark:hover:text-emerald-400"
      >
        + Dodaj ćwiczenie
      </button>
    </section>
  );
}
