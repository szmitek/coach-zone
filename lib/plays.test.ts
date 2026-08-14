import { describe, expect, it } from "vitest";
import { canDeletePlay } from "./plays";

describe("canDeletePlay", () => {
  it("lets the owner delete regardless of team or role", () => {
    expect(
      canDeletePlay({
        ownerId: "coach-1",
        teamId: null,
        currentUserId: "coach-1",
        isHeadCoach: false,
      }),
    ).toBe(true);
  });

  it("lets a team's head coach delete a team-scoped play they don't own", () => {
    expect(
      canDeletePlay({
        ownerId: "coach-1",
        teamId: "team-1",
        currentUserId: "coach-2",
        isHeadCoach: true,
      }),
    ).toBe(true);
  });

  it("refuses an assistant coach who doesn't own the play", () => {
    expect(
      canDeletePlay({
        ownerId: "coach-1",
        teamId: "team-1",
        currentUserId: "coach-2",
        isHeadCoach: false,
      }),
    ).toBe(false);
  });

  it("refuses a head coach on a personal (non-team) play they don't own", () => {
    expect(
      canDeletePlay({
        ownerId: "coach-1",
        teamId: null,
        currentUserId: "coach-2",
        isHeadCoach: true,
      }),
    ).toBe(false);
  });

  it("refuses when there is no signed-in user", () => {
    expect(
      canDeletePlay({
        ownerId: "coach-1",
        teamId: "team-1",
        currentUserId: null,
        isHeadCoach: true,
      }),
    ).toBe(false);
  });
});
