export type PointElementType = "player" | "opponent" | "ball" | "cone" | "qb";
export type PathHeadStyle = "arrow" | "bar" | "none";

export interface BoardPoint {
  x: number;
  y: number;
}

export interface PointBoardElement {
  id: string;
  type: "point";
  kind: PointElementType;
  x: number;
  y: number;
  label: string;
}

export interface PathBoardElement {
  id: string;
  type: "path";
  /** Id of the tool that created it (e.g. "route", "block") - informational only, styling is self-contained below. */
  kind: string;
  points: BoardPoint[];
  color: string;
  strokeWidth: number;
  headStyle: PathHeadStyle;
  dash?: number[];
}

export type BoardElement = PointBoardElement | PathBoardElement;

export type ActiveTool = "select" | string;

// Which point kinds get a double-tap-to-number affordance - true across
// every sport, so it lives here rather than in per-sport config.
export const LABELABLE_POINT_KINDS: PointElementType[] = [
  "player",
  "opponent",
  "qb",
];

export function isPathElement(
  element: BoardElement,
): element is PathBoardElement {
  return element.type === "path";
}

export function isPointElement(
  element: BoardElement,
): element is PointBoardElement {
  return element.type === "point";
}
