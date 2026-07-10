export type PointElementType = "player" | "opponent" | "ball" | "cone";
export type LineElementType = "arrow" | "passLine";
export type BoardElementType = PointElementType | LineElementType;

export type PitchMode = "full" | "half";

export type ActiveTool = "select" | BoardElementType;

interface BoardElementBase {
  id: string;
  x: number;
  y: number;
  rotation: number;
}

export interface PointBoardElement extends BoardElementBase {
  type: PointElementType;
  label: string;
}

export interface LineBoardElement extends BoardElementBase {
  type: LineElementType;
  /** End point of the line/arrow, relative to (x, y), before rotation. */
  endX: number;
  endY: number;
}

export type BoardElement = PointBoardElement | LineBoardElement;

export function isLineElement(
  element: BoardElement,
): element is LineBoardElement {
  return element.type === "arrow" || element.type === "passLine";
}

export function isPointElement(
  element: BoardElement,
): element is PointBoardElement {
  return !isLineElement(element);
}
