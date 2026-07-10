import type { PitchMode } from "./types";

interface PitchDimensions {
  width: number;
  height: number;
}

// Logical (unscaled) pitch sizes. The stage is scaled to fit its container,
// so these only need to keep a sensible aspect ratio - not real meters.
export const PITCH_DIMENSIONS: Record<PitchMode, PitchDimensions> = {
  full: { width: 1040, height: 680 },
  half: { width: 680, height: 540 },
};

export const PITCH_LINE_COLOR = "#e5e7eb";
export const PITCH_FILL_COLOR = "#1f8a4c";
