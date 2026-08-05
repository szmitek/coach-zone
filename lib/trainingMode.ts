import { boardElementsOf } from "@/lib/exercises";
import type { BoardElement } from "@/lib/board/types";
import type {
  Exercise,
  Position,
  WorkoutItem,
  WorkoutSection,
} from "@/lib/supabase/types";
import {
  DEFAULT_ITEM_DURATION_MIN,
  SECTION_LABELS,
  SECTION_ORDER,
} from "@/lib/workouts";

// Seeded once per sport as the explicit "no split" tag (see
// supabase/migrations/20260727210405_exercise_scope_positions_and_sport_fix.sql).
// An exercise tagged TEAM collapses into the same group as an untagged one -
// both mean "whole team", not a position-specific track.
const TEAM_POSITION_CODE = "TEAM";
const TEAM_GROUP_KEY = "team";
// Sorts before any real position's sort_order (10, 20, ... in the seed data),
// so a stray whole-team block in an otherwise split section still leads.
const TEAM_GROUP_SORT_ORDER = -1;

export interface TrainingExercise {
  id: string;
  title: string;
  description: string | null;
  steps: string[];
  boardElements: BoardElement[] | null;
  boardFieldMode: string | null;
  sportSlug: string | null;
}

export interface TrainingGroup {
  /** Stable identity for a group across every block in its section - sorted
   *  position codes joined with "+", or TEAM_GROUP_KEY for the whole team. */
  key: string;
  /** Empty for the whole-team group. */
  positions: Position[];
  itemId: string;
  durationMin: number | null;
  exercise: TrainingExercise;
}

export interface TrainingBlock {
  groups: TrainingGroup[];
  /** Longest group duration in this block, falling back to
   *  DEFAULT_ITEM_DURATION_MIN when nothing in the block has one set - the
   *  whole block waits on its slowest group, so the timer follows the max. */
  suggestedDurationMin: number;
}

export interface TrainingSection {
  section: WorkoutSection;
  label: string;
  blocks: TrainingBlock[];
}

export type TrainingPlan = TrainingSection[];

const UNAVAILABLE_EXERCISE: TrainingExercise = {
  id: "",
  title: "Ćwiczenie niedostępne",
  description: null,
  steps: [],
  boardElements: null,
  boardFieldMode: null,
  sportSlug: null,
};

function toTrainingExercise(
  exercise: Exercise | undefined,
  sportSlugById: Record<number, string>,
): TrainingExercise {
  if (!exercise) return UNAVAILABLE_EXERCISE;
  return {
    id: exercise.id,
    title: exercise.title,
    description: exercise.description,
    steps: exercise.steps,
    boardElements: boardElementsOf(exercise),
    boardFieldMode: exercise.board_field_mode,
    sportSlug:
      exercise.sport_id !== null
        ? (sportSlugById[exercise.sport_id] ?? null)
        : null,
  };
}

function groupKeyFor(positions: Position[]): {
  key: string;
  positions: Position[];
  sortOrder: number;
} {
  const tagged = positions
    .filter((position) => position.code !== TEAM_POSITION_CODE)
    .sort((a, b) => a.sort_order - b.sort_order);
  if (tagged.length === 0) {
    return {
      key: TEAM_GROUP_KEY,
      positions: [],
      sortOrder: TEAM_GROUP_SORT_ORDER,
    };
  }
  return {
    key: tagged
      .map((position) => position.code)
      .sort()
      .join("+"),
    positions: tagged,
    sortOrder: tagged[0].sort_order,
  };
}

/**
 * Reconstructs the section's ordered "blocks" from its flat, position-sorted
 * workout_items: items are partitioned by their derived position-tag group
 * (preserving each group's own relative order), then zipped index-wise
 * across groups. A section with a single group (no positional split, or
 * every item tagged for the whole team) zips down to one block per item -
 * identical to a plain sequential walk. Groups of uneven length just stop
 * contributing to later blocks once they run out, instead of padding.
 */
function buildSectionBlocks(
  items: WorkoutItem[],
  exercisesById: Record<string, Exercise>,
  positionsByExerciseId: Record<string, Position[]>,
  sportSlugById: Record<number, string>,
): TrainingBlock[] {
  const sorted = items.slice().sort((a, b) => a.position - b.position);

  const groupOrder: string[] = [];
  const itemsByGroup = new Map<string, WorkoutItem[]>();
  const positionsByGroup = new Map<string, Position[]>();
  const sortOrderByGroup = new Map<string, number>();

  for (const item of sorted) {
    const { key, positions, sortOrder } = groupKeyFor(
      positionsByExerciseId[item.exercise_id] ?? [],
    );
    if (!itemsByGroup.has(key)) {
      groupOrder.push(key);
      itemsByGroup.set(key, []);
      positionsByGroup.set(key, positions);
      sortOrderByGroup.set(key, sortOrder);
    }
    itemsByGroup.get(key)!.push(item);
  }

  const orderedGroupKeys = groupOrder
    .slice()
    .sort((a, b) => sortOrderByGroup.get(a)! - sortOrderByGroup.get(b)!);

  const blockCount = Math.max(
    0,
    ...orderedGroupKeys.map((key) => itemsByGroup.get(key)!.length),
  );

  const blocks: TrainingBlock[] = [];
  for (let i = 0; i < blockCount; i++) {
    const groups: TrainingGroup[] = [];
    for (const key of orderedGroupKeys) {
      const item = itemsByGroup.get(key)![i];
      if (!item) continue;
      groups.push({
        key,
        positions: positionsByGroup.get(key)!,
        itemId: item.id,
        durationMin: item.duration_min,
        exercise: toTrainingExercise(
          exercisesById[item.exercise_id],
          sportSlugById,
        ),
      });
    }
    const suggestedDurationMin = Math.max(
      0,
      ...groups.map((group) => group.durationMin ?? 0),
    );
    blocks.push({
      groups,
      suggestedDurationMin:
        suggestedDurationMin > 0
          ? suggestedDurationMin
          : DEFAULT_ITEM_DURATION_MIN,
    });
  }
  return blocks;
}

export function buildTrainingPlan(params: {
  items: WorkoutItem[];
  exercisesById: Record<string, Exercise>;
  positionsByExerciseId: Record<string, Position[]>;
  sportSlugById: Record<number, string>;
}): TrainingPlan {
  const { items, exercisesById, positionsByExerciseId, sportSlugById } = params;

  const itemsBySection = new Map<WorkoutSection, WorkoutItem[]>();
  for (const section of SECTION_ORDER) itemsBySection.set(section, []);
  for (const item of items) itemsBySection.get(item.section)?.push(item);

  const plan: TrainingPlan = [];
  for (const section of SECTION_ORDER) {
    const sectionItems = itemsBySection.get(section) ?? [];
    if (sectionItems.length === 0) continue;
    plan.push({
      section,
      label: SECTION_LABELS[section],
      blocks: buildSectionBlocks(
        sectionItems,
        exercisesById,
        positionsByExerciseId,
        sportSlugById,
      ),
    });
  }
  return plan;
}

// mm:ss, minutes unpadded (drills run single-digit to low-double-digit
// minutes, never hour-scale) - "9:05", "10:00".
export function formatCountdown(remainingMs: number): string {
  const totalSeconds = Math.max(0, Math.round(remainingMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export interface TimerTickResult {
  remainingMs: number;
  /** True only the instant remaining first hits 0 for this run - stays
   *  false after, even though remainingMs keeps reading 0. */
  justCompleted: boolean;
}

/**
 * Pure core of the countdown, kept apart from the React hook that owns
 * state/effects/DOM listeners. A backgrounded or throttled tab can skip any
 * number of ticks; this only ever compares two absolute instants, so it
 * doesn't matter how long the gap between calls was - the very next call
 * (from a resumed interval or a visibilitychange handler) reports the true
 * remaining time and fires completion exactly once, even if "now" lands
 * long after the target.
 */
export function computeTimerTick(params: {
  targetAt: number;
  now: number;
  alreadyFired: boolean;
}): TimerTickResult {
  const remainingMs = Math.max(0, params.targetAt - params.now);
  return {
    remainingMs,
    justCompleted: remainingMs === 0 && !params.alreadyFired,
  };
}
