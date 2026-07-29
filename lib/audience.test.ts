import { describe, expect, it } from "vitest";
import { audienceEquals, audienceToFields, defaultAudience } from "./audience";

describe("audienceToFields", () => {
  it("personal writes is_public false and a null team_id", () => {
    expect(audienceToFields({ kind: "personal" })).toEqual({
      is_public: false,
      team_id: null,
    });
  });

  it("team writes is_public false and that team's id", () => {
    expect(audienceToFields({ kind: "team", teamId: "team-1" })).toEqual({
      is_public: false,
      team_id: "team-1",
    });
  });

  it("public writes is_public true and a null team_id", () => {
    expect(audienceToFields({ kind: "public" })).toEqual({
      is_public: true,
      team_id: null,
    });
  });
});

describe("defaultAudience", () => {
  it("defaults to personal with no teams", () => {
    expect(defaultAudience([])).toEqual({ kind: "personal" });
  });

  it("defaults to the sole team when exactly one exists", () => {
    expect(defaultAudience([{ id: "team-1" }])).toEqual({
      kind: "team",
      teamId: "team-1",
    });
  });

  it("does not guess which team when there are several", () => {
    expect(defaultAudience([{ id: "team-1" }, { id: "team-2" }])).toEqual({
      kind: "personal",
    });
  });
});

describe("audienceEquals", () => {
  it("treats two personal values as equal", () => {
    expect(audienceEquals({ kind: "personal" }, { kind: "personal" })).toBe(
      true,
    );
  });

  it("compares team audiences by teamId", () => {
    expect(
      audienceEquals(
        { kind: "team", teamId: "team-1" },
        { kind: "team", teamId: "team-1" },
      ),
    ).toBe(true);
    expect(
      audienceEquals(
        { kind: "team", teamId: "team-1" },
        { kind: "team", teamId: "team-2" },
      ),
    ).toBe(false);
  });

  it("treats different kinds as unequal", () => {
    expect(audienceEquals({ kind: "personal" }, { kind: "public" })).toBe(
      false,
    );
  });
});
