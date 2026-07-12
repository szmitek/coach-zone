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
  wavy?: boolean;
}

export function createPathElement(
  kind: string,
  preset: PathStylePreset,
  points: BoardPoint[],
  curved: boolean = false,
): PathBoardElement {
  return { id: createId(), type: "path", kind, points, curved, ...preset };
}

/**
 * A line spanning the full field in one axis (e.g. the line of scrimmage),
 * inset slightly from the border. Orientation must match the field's own
 * yard-line grain so the line stays parallel to it: "horizontal" spans
 * left-to-right at a fixed y (parallel to horizontal yard lines),
 * "vertical" spans top-to-bottom at a fixed x (parallel to vertical yard
 * lines, as in this app's football field).
 */
export function createFullWidthLine(
  kind: string,
  preset: PathStylePreset,
  orientation: "horizontal" | "vertical",
  pos: BoardPoint,
  fieldWidth: number,
  fieldHeight: number,
): PathBoardElement {
  const points: BoardPoint[] =
    orientation === "vertical"
      ? [
          { x: pos.x, y: FULL_WIDTH_INSET },
          { x: pos.x, y: Math.max(fieldHeight - FULL_WIDTH_INSET, FULL_WIDTH_INSET) },
        ]
      : [
          { x: FULL_WIDTH_INSET, y: pos.y },
          { x: Math.max(fieldWidth - FULL_WIDTH_INSET, FULL_WIDTH_INSET), y: pos.y },
        ];
  return createPathElement(kind, preset, points);
}
