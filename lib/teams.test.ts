import { describe, expect, it } from "vitest";
import { isInActiveTeamScope, resolveActiveTeamId } from "./teams";

describe("resolveActiveTeamId", () => {
  it("returns null with no teams and no active_team_id", () => {
    expect(resolveActiveTeamId(null, [])).toBeNull();
  });

  it("falls back to the sole team when active_team_id was never set", () => {
    expect(resolveActiveTeamId(null, [{ id: "team-1" }])).toBe("team-1");
  });

  it("does not guess when there are several teams and none is active", () => {
    expect(
      resolveActiveTeamId(null, [{ id: "team-1" }, { id: "team-2" }]),
    ).toBeNull();
  });

  it("prefers the stored active_team_id over the sole-team fallback", () => {
    expect(resolveActiveTeamId("team-9", [{ id: "team-1" }])).toBe("team-9");
  });
});

describe("isInActiveTeamScope", () => {
  it("always shows a personal/public item (team_id null), active team or not", () => {
    expect(isInActiveTeamScope({ team_id: null }, null)).toBe(true);
    expect(isInActiveTeamScope({ team_id: null }, "team-1")).toBe(true);
  });

  it("shows a team-scoped item only while that team is active", () => {
    expect(isInActiveTeamScope({ team_id: "team-1" }, "team-1")).toBe(true);
    expect(isInActiveTeamScope({ team_id: "team-1" }, "team-2")).toBe(false);
  });

  it("hides a team-scoped item when no team is active - the exact-match bug the sport filter already hit once", () => {
    expect(isInActiveTeamScope({ team_id: "team-1" }, null)).toBe(false);
  });
});
