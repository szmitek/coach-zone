import { describe, expect, it } from "vitest";
import {
  buildTrainingPlan,
  computeTimerTick,
  formatCountdown,
} from "./trainingMode";
import type { Exercise, Position, WorkoutItem } from "./supabase/types";

function makeExercise(overrides: Partial<Exercise> & { id: string }): Exercise {
  return {
    author_id: null,
    board_field_mode: null,
    board_state: null,
    category_id: 1,
    created_at: "2026-01-01T00:00:00Z",
    description: null,
    difficulty: null,
    duration_min: null,
    equipment: [],
    is_public: true,
    media_url: null,
    sport_id: null,
    steps: [],
    team_id: null,
    title: "Ćwiczenie",
    updated_at: "2026-01-01T00:00:00Z",
    ...overrides,
  };
}

function makeItem(
  overrides: Partial<WorkoutItem> & { id: string; exercise_id: string },
): WorkoutItem {
  return {
    assigned_to: null,
    duration_min: 10,
    position: 0,
    section: "main",
    workout_id: "workout-1",
    ...overrides,
  };
}

function makePosition(
  overrides: Partial<Position> & { id: string; code: string },
): Position {
  return {
    label: overrides.code,
    sort_order: 0,
    sport_id: 1,
    ...overrides,
  };
}

describe("buildTrainingPlan", () => {
  it("returns an empty plan for a workout with no items", () => {
    expect(
      buildTrainingPlan({
        items: [],
        exercisesById: {},
        positionsByExerciseId: {},
        sportSlugById: {},
      }),
    ).toEqual([]);
  });

  it("only includes sections that have items, in section order", () => {
    const items = [
      makeItem({
        id: "i1",
        exercise_id: "e1",
        section: "cooldown",
        position: 0,
      }),
      makeItem({ id: "i2", exercise_id: "e1", section: "warmup", position: 0 }),
    ];
    const plan = buildTrainingPlan({
      items,
      exercisesById: { e1: makeExercise({ id: "e1" }) },
      positionsByExerciseId: {},
      sportSlugById: {},
    });
    expect(plan.map((s) => s.section)).toEqual(["warmup", "cooldown"]);
  });

  it("collapses a section with no positional split into one whole-team group, one block per item", () => {
    const items = [
      makeItem({ id: "i1", exercise_id: "e1", position: 0, duration_min: 8 }),
      makeItem({ id: "i2", exercise_id: "e2", position: 1, duration_min: 12 }),
    ];
    const plan = buildTrainingPlan({
      items,
      exercisesById: {
        e1: makeExercise({ id: "e1", title: "Trucht" }),
        e2: makeExercise({ id: "e2", title: "Rozciąganie" }),
      },
      positionsByExerciseId: {},
      sportSlugById: {},
    });

    expect(plan).toHaveLength(1);
    const [section] = plan;
    expect(section.blocks).toHaveLength(2);
    expect(section.blocks[0].groups).toEqual([
      expect.objectContaining({ key: "team", positions: [], itemId: "i1" }),
    ]);
    expect(section.blocks[0].suggestedDurationMin).toBe(8);
    expect(section.blocks[1].groups[0].exercise.title).toBe("Rozciąganie");
    expect(section.blocks[1].suggestedDurationMin).toBe(12);
  });

  it("treats an untagged exercise and one explicitly tagged TEAM as the same whole-team group", () => {
    const team = makePosition({ id: "p-team", code: "TEAM", sort_order: 100 });
    const items = [
      makeItem({ id: "i1", exercise_id: "e1", position: 0 }),
      makeItem({ id: "i2", exercise_id: "e2", position: 1 }),
    ];
    const plan = buildTrainingPlan({
      items,
      exercisesById: {
        e1: makeExercise({ id: "e1" }),
        e2: makeExercise({ id: "e2" }),
      },
      positionsByExerciseId: { e2: [team] },
      sportSlugById: {},
    });

    expect(plan[0].blocks).toHaveLength(2);
    expect(plan[0].blocks[0].groups[0].key).toBe("team");
    expect(plan[0].blocks[1].groups[0].key).toBe("team");
  });

  it("splits a section into parallel groups by position tag, zipped block by block", () => {
    const ol = makePosition({ id: "p-ol", code: "OL", sort_order: 10 });
    const wr = makePosition({ id: "p-wr", code: "WR", sort_order: 40 });
    const db = makePosition({ id: "p-db", code: "DB", sort_order: 90 });

    const items = [
      makeItem({
        id: "ol-1",
        exercise_id: "e-ol-1",
        position: 0,
        duration_min: 10,
      }),
      makeItem({
        id: "wr-1",
        exercise_id: "e-wr-1",
        position: 1,
        duration_min: 8,
      }),
      makeItem({
        id: "db-1",
        exercise_id: "e-db-1",
        position: 2,
        duration_min: 8,
      }),
      makeItem({
        id: "ol-2",
        exercise_id: "e-ol-2",
        position: 3,
        duration_min: 6,
      }),
      makeItem({
        id: "wr-2",
        exercise_id: "e-wr-2",
        position: 4,
        duration_min: 6,
      }),
      makeItem({
        id: "db-2",
        exercise_id: "e-db-2",
        position: 5,
        duration_min: 6,
      }),
    ];
    const exercisesById = Object.fromEntries(
      items.map((item) => [
        item.exercise_id,
        makeExercise({ id: item.exercise_id }),
      ]),
    );

    const plan = buildTrainingPlan({
      items,
      exercisesById,
      positionsByExerciseId: {
        "e-ol-1": [ol],
        "e-ol-2": [ol],
        "e-wr-1": [wr],
        "e-wr-2": [wr],
        "e-db-1": [db],
        "e-db-2": [db],
      },
      sportSlugById: {},
    });

    expect(plan[0].blocks).toHaveLength(2);
    // Ordered by the position's own sort_order: OL (10), WR (40), DB (90).
    expect(plan[0].blocks[0].groups.map((g) => g.key)).toEqual([
      "OL",
      "WR",
      "DB",
    ]);
    expect(plan[0].blocks[0].groups.map((g) => g.itemId)).toEqual([
      "ol-1",
      "wr-1",
      "db-1",
    ]);
    // OL is 10, the other two are 8 - the block waits on the slowest group.
    expect(plan[0].blocks[0].suggestedDurationMin).toBe(10);
    expect(plan[0].blocks[1].suggestedDurationMin).toBe(6);
  });

  it("keeps a multi-position tag combo as its own group, distinct from either position alone", () => {
    const ol = makePosition({ id: "p-ol", code: "OL", sort_order: 10 });
    const dl = makePosition({ id: "p-dl", code: "DL", sort_order: 60 });
    const items = [
      makeItem({ id: "i1", exercise_id: "e1", position: 0 }),
      makeItem({ id: "i2", exercise_id: "e2", position: 1 }),
    ];
    const plan = buildTrainingPlan({
      items,
      exercisesById: {
        e1: makeExercise({ id: "e1" }),
        e2: makeExercise({ id: "e2" }),
      },
      positionsByExerciseId: { e1: [ol], e2: [ol, dl] },
      sportSlugById: {},
    });

    const keys = plan[0].blocks[0].groups.map((g) => g.key);
    expect(keys).toEqual(["OL", "DL+OL"]);
  });

  it("stops a shorter group from contributing once it runs out, without affecting the other group", () => {
    const ol = makePosition({ id: "p-ol", code: "OL", sort_order: 10 });
    const wr = makePosition({ id: "p-wr", code: "WR", sort_order: 40 });
    const items = [
      makeItem({
        id: "ol-1",
        exercise_id: "e-ol-1",
        position: 0,
        duration_min: 5,
      }),
      makeItem({
        id: "ol-2",
        exercise_id: "e-ol-2",
        position: 1,
        duration_min: 5,
      }),
      makeItem({
        id: "wr-1",
        exercise_id: "e-wr-1",
        position: 2,
        duration_min: 5,
      }),
    ];
    const exercisesById = Object.fromEntries(
      items.map((item) => [
        item.exercise_id,
        makeExercise({ id: item.exercise_id }),
      ]),
    );
    const plan = buildTrainingPlan({
      items,
      exercisesById,
      positionsByExerciseId: {
        "e-ol-1": [ol],
        "e-ol-2": [ol],
        "e-wr-1": [wr],
      },
      sportSlugById: {},
    });

    expect(plan[0].blocks).toHaveLength(2);
    expect(plan[0].blocks[0].groups.map((g) => g.key)).toEqual(["OL", "WR"]);
    expect(plan[0].blocks[1].groups.map((g) => g.key)).toEqual(["OL"]);
  });

  it("falls back to DEFAULT_ITEM_DURATION_MIN when every group in a block has no duration set", () => {
    const items = [
      makeItem({ id: "i1", exercise_id: "e1", duration_min: null }),
    ];
    const plan = buildTrainingPlan({
      items,
      exercisesById: { e1: makeExercise({ id: "e1" }) },
      positionsByExerciseId: {},
      sportSlugById: {},
    });
    expect(plan[0].blocks[0].suggestedDurationMin).toBe(10);
  });

  it("falls back to a placeholder exercise when the referenced exercise row is missing", () => {
    const items = [makeItem({ id: "i1", exercise_id: "gone" })];
    const plan = buildTrainingPlan({
      items,
      exercisesById: {},
      positionsByExerciseId: {},
      sportSlugById: {},
    });
    expect(plan[0].blocks[0].groups[0].exercise.title).toBe(
      "Ćwiczenie niedostępne",
    );
  });

  it("resolves board elements and sport slug for the group detail view", () => {
    const items = [makeItem({ id: "i1", exercise_id: "e1" })];
    const plan = buildTrainingPlan({
      items,
      exercisesById: {
        e1: makeExercise({
          id: "e1",
          sport_id: 7,
          board_field_mode: "full",
          board_state: [
            { id: "el-1", type: "point", kind: "cone", x: 1, y: 2, label: "" },
          ],
        }),
      },
      positionsByExerciseId: {},
      sportSlugById: { 7: "american_football" },
    });
    const { exercise } = plan[0].blocks[0].groups[0];
    expect(exercise.sportSlug).toBe("american_football");
    expect(exercise.boardFieldMode).toBe("full");
    expect(exercise.boardElements).toEqual([
      { id: "el-1", type: "point", kind: "cone", x: 1, y: 2, label: "" },
    ]);
  });
});

describe("formatCountdown", () => {
  it("formats whole minutes with :00 seconds", () => {
    expect(formatCountdown(10 * 60_000)).toBe("10:00");
  });

  it("zero-pads seconds under 10", () => {
    expect(formatCountdown(65_000)).toBe("1:05");
  });

  it("does not pad minutes", () => {
    expect(formatCountdown(9 * 60_000 + 5_000)).toBe("9:05");
  });

  it("clamps negative remaining time to 0:00", () => {
    expect(formatCountdown(-500)).toBe("0:00");
  });
});

describe("computeTimerTick", () => {
  it("reports time remaining before the target and does not complete", () => {
    const result = computeTimerTick({
      targetAt: 10_000,
      now: 4_000,
      alreadyFired: false,
    });
    expect(result).toEqual({ remainingMs: 6_000, justCompleted: false });
  });

  it("completes exactly once at the target instant", () => {
    const result = computeTimerTick({
      targetAt: 10_000,
      now: 10_000,
      alreadyFired: false,
    });
    expect(result).toEqual({ remainingMs: 0, justCompleted: true });
  });

  it("clamps to 0 and still completes when far past the target - the backgrounded-tab case", () => {
    // A tab backgrounded well past the block's duration: the next tick, on
    // resume, jumps straight from "not fired" to "just completed" without
    // ever having observed the intermediate seconds.
    const result = computeTimerTick({
      targetAt: 10_000,
      now: 10_000 + 30 * 60_000,
      alreadyFired: false,
    });
    expect(result).toEqual({ remainingMs: 0, justCompleted: true });
  });

  it("never re-fires completion once already fired", () => {
    const result = computeTimerTick({
      targetAt: 10_000,
      now: 20_000,
      alreadyFired: true,
    });
    expect(result).toEqual({ remainingMs: 0, justCompleted: false });
  });
});
