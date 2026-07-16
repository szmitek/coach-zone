/**
 * Easing curves for the board showcase animation. Everything here favours
 * "calm and deliberate" over "snappy" - no bounce, no overshoot - since the
 * whole point of the showcase is to read as a premium, unhurried product
 * moment rather than a flashy demo.
 */

export type Easing = (t: number) => number;

export function clamp01(t: number): number {
  return Math.min(1, Math.max(0, t));
}

export const easeInOutCubic: Easing = (t) => {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
};

export const easeOutCubic: Easing = (t) => {
  const x = clamp01(t);
  return 1 - (1 - x) ** 3;
};

export const easeOutQuint: Easing = (t) => {
  const x = clamp01(t);
  return 1 - (1 - x) ** 5;
};

/** Maps `elapsed` into [0,1] progress over [startAt, startAt+duration], then applies an easing curve. */
export function timedProgress(
  elapsed: number,
  startAt: number,
  duration: number,
  easing: Easing = easeInOutCubic,
): number {
  if (duration <= 0) return elapsed >= startAt ? 1 : 0;
  return easing(clamp01((elapsed - startAt) / duration));
}
