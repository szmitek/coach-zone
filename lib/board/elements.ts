import type {
  BoardPoint,
  PathBoardElement,
  PathHeadStyle,
  PointBoardElement,
  PointElementType,
} from "./types";

export const POINT_RADIUS = 18;

// Double-tap-to-finish a path: a second tap within this time and distance
// of the previous one ends the path instead of adding another point.
export const DOUBLE_TAP_MS = 400;
export const DOUBLE_TAP_DIST = 26;

// How far in from each sideline a full-width line (e.g. line of scrimmage)
// is drawn, so it doesn't sit flush on top of the field border.
export const FULL_WIDTH_INSET = 24;

function createId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function createPointElement(
  kind: PointElementType,
  x: number,
  y: number,
  defaultLabel: string = "",
): PointBoardElement {
  return { id: createId(), type: "point", kind, x, y, label: defaultLabel };
}

export interface PathStylePreset {
  color: string;
  strokeWidth: number;
  headStyle: PathHeadStyle;
  dash?: number[];
}

export function createPathElement(
  kind: string,
  preset: PathStylePreset,
  points: BoardPoint[],
): PathBoardElement {
  return { id: createId(), type: "path", kind, points, ...preset };
}

export function createFullWidthLine(
  kind: string,
  preset: PathStylePreset,
  y: number,
  fieldWidth: number,
): PathBoardElement {
  return createPathElement(kind, preset, [
    { x: FULL_WIDTH_INSET, y },
    { x: Math.max(fieldWidth - FULL_WIDTH_INSET, FULL_WIDTH_INSET), y },
  ]);
}
