import { DOUBLE_TAP_DIST, DOUBLE_TAP_MS } from "./elements";
import { distance } from "./path";
import type { BoardPoint } from "./types";

// Mobile browsers can deliver more than one Konva event ("tap" and "click")
// for a single physical touch, especially when a device's touch-to-mouse
// compatibility click isn't fully suppressed. A stray duplicate of the SAME
// touch lands right after the real one, at distance 0, and would get
// misread as a deliberate double-tap-to-finish. A genuine human double-tap
// always has more than a few tens of milliseconds between the two touches;
// a synthesized duplicate of the same touch does not. This guard - well
// under DOUBLE_TAP_MS so it never interferes with a genuine fast
// double-tap-to-finish - swallows only the latter.
export const DUPLICATE_EVENT_GUARD_MS = 80;

export function isDuplicateStageEvent(
  now: number,
  lastHandledAt: number,
): boolean {
  return now - lastHandledAt < DUPLICATE_EVENT_GUARD_MS;
}

export interface LastTap {
  time: number;
  pos: BoardPoint;
}

/**
 * A second tap finishes the path only if it lands within DOUBLE_TAP_MS and
 * DOUBLE_TAP_DIST of the previous one. `pos`/`last.pos` are given in the
 * Konva Stage's local (unscaled) coordinate space - i.e. divided by the
 * Stage's own scaleX/scaleY - so their distance is converted back to real
 * screen pixels via `scale` before comparing. Comparing the raw logical
 * distance directly against DOUBLE_TAP_DIST would make the same "26" mean a
 * different number of real screen pixels depending on zoom level, field
 * mode, and viewport width: at scale > 1 (e.g. a wide viewport combined
 * with a small-design field mode like the AF red zone) the real-world
 * tolerance balloons well past 26px, wide enough for two genuinely
 * distinct, closely-spaced taps - such as a fast cone-slalom route on
 * American football - to collapse into a false double-tap-to-finish.
 */
export function isDoubleTapToFinish(
  now: number,
  pos: BoardPoint,
  last: LastTap | null,
  scale: number,
): boolean {
  if (last === null) return false;
  if (now - last.time >= DOUBLE_TAP_MS) return false;
  return distance(pos, last.pos) * scale < DOUBLE_TAP_DIST;
}
