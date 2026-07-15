import { describe, expect, it } from "vitest";
import { DOUBLE_TAP_DIST, DOUBLE_TAP_MS } from "./elements";
import {
  DUPLICATE_EVENT_GUARD_DIST,
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
    const last = { time: 1_000, pos: { x: 100, y: 100 } };
    const now = last.time + DUPLICATE_EVENT_GUARD_MS - 1;
    const pos = { x: 100, y: 100 };
    expect(isDuplicateStageEvent(now, pos, last, 1)).toBe(true);
  });

  it("does not flag an event at or beyond the guard window as a duplicate, even at the same spot", () => {
    const last = { time: 1_000, pos: { x: 100, y: 100 } };
    const now = last.time + DUPLICATE_EVENT_GUARD_MS;
    const pos = { x: 100, y: 100 };
    expect(isDuplicateStageEvent(now, pos, last, 1)).toBe(false);
  });

  it("does not flag the very first stage event (no previous event recorded)", () => {
    expect(isDuplicateStageEvent(1_000, { x: 0, y: 0 }, null, 1)).toBe(false);
  });

  // R15.3: this is the actual bug. The guard exists to swallow a stray
  // synthesized duplicate of the SAME physical touch (tap + compat click),
  // which lands at essentially the same coordinates. A time-only guard also
  // swallows a genuine second tap at DISTINCT coordinates - e.g. two cones
  // in a tight slalom tapped well under 80ms apart - silently dropping a
  // real route point before it ever reaches handlePathTap / the
  // double-tap-to-finish check.
  it("does NOT flag a fast second tap at clearly distinct coordinates as a duplicate", () => {
    const last = { time: 1_000, pos: { x: 100, y: 100 } };
    const now = last.time + 50; // well within DUPLICATE_EVENT_GUARD_MS
    const pos = { x: 100 + DUPLICATE_EVENT_GUARD_DIST * 5, y: 100 };
    expect(isDuplicateStageEvent(now, pos, last, 1)).toBe(false);
  });

  it("is scale-aware: converts logical-space distance to real screen pixels before comparing", () => {
    const scale = 3;
    const last = { time: 1_000, pos: { x: 100, y: 100 } };
    const now = last.time + 50;
    // Logical gap alone is tiny, but at this scale the real on-screen gap
    // is well past DUPLICATE_EVENT_GUARD_DIST - a genuinely distinct tap.
    const logicalGap = DUPLICATE_EVENT_GUARD_DIST;
    const pos = { x: 100 + logicalGap, y: 100 };
    expect(isDuplicateStageEvent(now, pos, last, scale)).toBe(false);
  });

  // R15.3 follow-up: this is the case the position-aware guard exists to
  // still catch. Traced in Konva's Stage.js (setPointersPositions /
  // _pointerup): "tap" is synthesized from the native touchend event's
  // touch.clientX/clientY, "click" from a browser-synthesized compat
  // mouseup's evt.clientX/clientY - two DIFFERENT native events, computed
  // through the same content-rect math, not one shared coordinate read. Per
  // the universally-implemented touch-to-mouse compatibility-event
  // convention the synthetic click reuses the ending touch's screen
  // position, so real-world drift between the two is expected to be near
  // 0px - but it is not literally the same object, so a test must exercise
  // it as two independent events with a small (non-zero) coordinate delta,
  // not as one mocked position reused for both.
  it("still catches a same-touch onTap+onClick pair even with a few pixels of realistic coordinate drift", () => {
    // "tap" from touchend at the physical touch point.
    const tapEvent = { time: 1_000, pos: { x: 200, y: 150 } };
    // Browser-synthesized "click" moments later, for the SAME physical
    // touch - clientX/clientY nominally match the touch, but allow a small
    // realistic drift (sub-pixel rect rounding etc.), well under
    // DUPLICATE_EVENT_GUARD_DIST.
    const clickEvent = {
      time: tapEvent.time + 20,
      pos: { x: tapEvent.pos.x + 3, y: tapEvent.pos.y - 2 },
    };
    expect(
      isDuplicateStageEvent(clickEvent.time, clickEvent.pos, tapEvent, 1),
    ).toBe(true);
  });

  it("still catches a same-touch pair at the largest realistic AF end-zone scale with drift", () => {
    // Combine the R15.2 scale correction with the R15.3 same-touch drift
    // case: even at the largest observed AF scale, a few real screen px of
    // drift between tap and click must still be swallowed as a duplicate.
    const scale = 900 / 384; // ~2.34, AF end-zone (Strefa końcowa)
    const tapEvent = { time: 1_000, pos: { x: 200, y: 150 } };
    const screenDriftX = 4;
    const screenDriftY = 3;
    const clickEvent = {
      time: tapEvent.time + 20,
      pos: {
        x: tapEvent.pos.x + screenDriftX / scale,
        y: tapEvent.pos.y - screenDriftY / scale,
      },
    };
    expect(
      isDuplicateStageEvent(clickEvent.time, clickEvent.pos, tapEvent, scale),
    ).toBe(true);
  });

  it("simulates a fast-tap sequence: N distinct, closely-spaced taps under the guard window each register as separate stage events, none swallowed", () => {
    // Mirrors a real tight cone-slalom sequence: every tap lands well
    // within DUPLICATE_EVENT_GUARD_MS of the previous one, but at a
    // distinct coordinate. This exercises event-level logic only (the pure
    // decision function against a sequence of (time, position) inputs) -
    // it does not drive a real Konva Stage or a real touchscreen, so it
    // cannot prove real-device touch/compat-event behaviour.
    const taps = [
      { time: 0, pos: { x: 0, y: 0 } },
      { time: 30, pos: { x: 40, y: 0 } },
      { time: 65, pos: { x: 80, y: 5 } },
      { time: 100, pos: { x: 120, y: 0 } },
      { time: 140, pos: { x: 160, y: 8 } },
    ];

    let last: { time: number; pos: { x: number; y: number } } | null = null;
    const registered: typeof taps = [];
    for (const tap of taps) {
      const duplicate = isDuplicateStageEvent(tap.time, tap.pos, last, 1);
      expect(duplicate).toBe(false);
      registered.push(tap);
      last = tap;
    }
    expect(registered).toHaveLength(taps.length);
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

  it("R15.2: two taps ~30 real screen px apart in the narrowest AF field mode (Strefa końcowa) do NOT finish the route", () => {
    // Regression test for the actual reported repro: fast cone-slalom on
    // American Football, specifically in "Strefa końcowa" (end zone) mode -
    // the narrowest fieldDesignWidth, and therefore the LARGEST
    // `containerWidth / fieldDesignWidth` scale of any AF mode. Numbers
    // mirror the real config: AF_REDZONE_WIDTH (components/board/fields/
    // AmericanFootballField.tsx) is 384 design units; a representative
    // container is 900 real screen px wide, giving scale = 900 / 384.
    // `pos`/`last.pos` are logical (Stage-local) coordinates, as produced by
    // Konva's `getRelativePointerPosition()` - i.e. already divided by this
    // same scale - so a real on-screen gap of `screenGap` corresponds to a
    // logical gap of `screenGap / scale`.
    const scale = 900 / 384; // ~2.34 - largest AF scale (end-zone mode)
    const screenGap = 30; // real on-screen px between two distinct cone taps
    const logicalGap = screenGap / scale;
    const last = { time: 1_000, pos: { x: 100, y: 100 } };
    const now = last.time + 50; // fast tap, well inside DOUBLE_TAP_MS
    const pos = { x: 100 + logicalGap, y: 100 };

    // Sanity: at this scale the logical gap alone looks deceptively small -
    // this is precisely the trap an unconverted (or wrongly-inverted)
    // comparison would fall into.
    expect(logicalGap).toBeLessThan(DOUBLE_TAP_DIST);

    expect(isDoubleTapToFinish(now, pos, last, scale)).toBe(false);
  });

  it("R15.2: the same real ~30px screen gap behaves identically across AF full field, AF end zone, and a wide-field sport", () => {
    // The scale correction must be scale-invariant: the same real on-screen
    // tap distance should yield the same true/false verdict no matter how
    // narrow or wide the active field mode's design width is.
    const screenGap = 30;
    const scenarios = [
      { name: "AF full field (Całe boisko)", containerWidth: 900, fieldDesignWidth: 1200 },
      { name: "AF end zone (Strefa końcowa)", containerWidth: 900, fieldDesignWidth: 384 },
      { name: "wide-field sport", containerWidth: 900, fieldDesignWidth: 2000 },
    ];

    for (const { containerWidth, fieldDesignWidth } of scenarios) {
      const scale = containerWidth / fieldDesignWidth;
      const logicalGap = screenGap / scale;
      const last = { time: 1_000, pos: { x: 100, y: 100 } };
      const now = last.time + 50;
      const pos = { x: 100 + logicalGap, y: 100 };
      expect(isDoubleTapToFinish(now, pos, last, scale)).toBe(false);
    }
  });
});
