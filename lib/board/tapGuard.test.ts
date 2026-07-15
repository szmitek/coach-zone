import { describe, expect, it } from "vitest";
import { DOUBLE_TAP_DIST, DOUBLE_TAP_MS } from "./elements";
import {
  DUPLICATE_EVENT_GUARD_MS,
  isDoubleTapToFinish,
  isDuplicateStageEvent,
} from "./tapGuard";

// NOTE: these tests exercise the pure decision functions only - "was this
// pointer/tap event a synthetic duplicate?" and "does this second tap
// finish the path?". They prove the event-level logic is correct given a
// sequence of (time, position) inputs, but they do NOT drive an actual
// Konva Stage or real touchscreen, so they cannot prove real-device touch
// behaviour (e.g. whether a phone browser really suppresses the synthetic
// click after touchstart). That part is verified manually on-device.

describe("isDuplicateStageEvent (R11 guard)", () => {
  it("treats a second event at the same coordinates within the guard window as a duplicate", () => {
    const lastHandledAt = 1_000;
    const now = lastHandledAt + DUPLICATE_EVENT_GUARD_MS - 1;
    expect(isDuplicateStageEvent(now, lastHandledAt)).toBe(true);
  });

  it("does not flag an event at or beyond the guard window as a duplicate", () => {
    const lastHandledAt = 1_000;
    const now = lastHandledAt + DUPLICATE_EVENT_GUARD_MS;
    expect(isDuplicateStageEvent(now, lastHandledAt)).toBe(false);
  });
});

describe("isDoubleTapToFinish", () => {
  it("does not finish a path on its very first tap (no previous tap recorded)", () => {
    expect(isDoubleTapToFinish(1_000, { x: 0, y: 0 }, null, 1)).toBe(false);
  });

  it("finishes when a second tap lands on the same spot within the time window (genuine double-tap-to-finish)", () => {
    const last = { time: 1_000, pos: { x: 100, y: 100 } };
    const now = last.time + DOUBLE_TAP_MS - 1;
    const pos = { x: 100 + DOUBLE_TAP_DIST - 1, y: 100 };
    expect(isDoubleTapToFinish(now, pos, last, 1)).toBe(true);
  });

  it("does NOT finish when the second tap is outside the time window, even at the same spot", () => {
    const last = { time: 1_000, pos: { x: 100, y: 100 } };
    const now = last.time + DOUBLE_TAP_MS;
    const pos = { x: 100, y: 100 };
    expect(isDoubleTapToFinish(now, pos, last, 1)).toBe(false);
  });

  it("registers two fast taps that are far apart on screen as SEPARATE route points, not a finish", () => {
    // Fast (well under the time window) but clearly beyond the distance
    // threshold - e.g. two distinct cones a coach tapped quickly.
    const last = { time: 1_000, pos: { x: 100, y: 100 } };
    const now = last.time + 50;
    const pos = { x: 100 + DOUBLE_TAP_DIST * 3, y: 100 };
    expect(isDoubleTapToFinish(now, pos, last, 1)).toBe(false);
  });

  it("is scale-aware: a logical-space distance under the threshold does not fool the check at scale > 1", () => {
    // Root cause of the fast-cone-slalom bug: `pos` is in the Konva
    // Stage's local (unscaled) coordinate space. At scale > 1 (e.g. a wide
    // viewport paired with a small-design field mode such as the AF red
    // zone), a small logical-space gap corresponds to a real on-screen
    // pixel gap comfortably larger than the intended ~26px "same spot"
    // tolerance - so two genuinely distinct, closely-tapped cones must
    // still register as separate points, not a false finish.
    const scale = 2;
    const last = { time: 1_000, pos: { x: 100, y: 100 } };
    const now = last.time + 50;
    // Logical distance is just under DOUBLE_TAP_DIST, but real screen
    // distance (logical * scale) is well over it.
    const logicalGap = DOUBLE_TAP_DIST - 2;
    const pos = { x: 100 + logicalGap, y: 100 };
    expect(logicalGap).toBeLessThan(DOUBLE_TAP_DIST);
    expect(isDoubleTapToFinish(now, pos, last, scale)).toBe(false);
  });

  it("is scale-aware: still finishes a genuine same-spot double-tap at scale > 1", () => {
    const scale = 2;
    const last = { time: 1_000, pos: { x: 100, y: 100 } };
    const now = last.time + 50;
    // A tiny logical-space gap (finger jitter), still tiny once converted
    // to real screen pixels at this scale.
    const pos = { x: 100 + 2, y: 100 };
    expect(isDoubleTapToFinish(now, pos, last, scale)).toBe(true);
  });
});
