import { describe, expect, it } from "vitest";
import { canDeleteWorkout } from "./workouts";

describe("canDeleteWorkout", () => {
  it("lets the owner delete regardless of team or role", () => {
    expect(
      canDeleteWorkout({
        ownerId: "coach-1",
        teamId: null,
        currentUserId: "coach-1",
        isHeadCoach: false,
      }),
    ).toBe(true);
  });

  it("lets a team's head coach delete a team-scoped workout they don't own", () => {
    expect(
      canDeleteWorkout({
        ownerId: "coach-1",
        teamId: "team-1",
        currentUserId: "coach-2",
        isHeadCoach: true,
      }),
    ).toBe(true);
  });

  it("refuses an assistant coach who doesn't own the workout", () => {
    expect(
      canDeleteWorkout({
        ownerId: "coach-1",
        teamId: "team-1",
        currentUserId: "coach-2",
        isHeadCoach: false,
      }),
    ).toBe(false);
  });

  it("refuses a head coach on a personal (non-team) workout they don't own", () => {
    expect(
      canDeleteWorkout({
        ownerId: "coach-1",
        teamId: null,
        currentUserId: "coach-2",
        isHeadCoach: true,
      }),
    ).toBe(false);
  });

  it("refuses when there is no signed-in user", () => {
    expect(
      canDeleteWorkout({
        ownerId: "coach-1",
        teamId: "team-1",
        currentUserId: null,
        isHeadCoach: true,
      }),
    ).toBe(false);
  });
});
