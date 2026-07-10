import type {
  BoardElement,
  BoardElementType,
  LineElementType,
  PointElementType,
} from "./types";

export const POINT_RADIUS = 18;
export const DEFAULT_LINE_LENGTH = 110;
export const MIN_LINE_LENGTH = 24;

const LINE_TYPES: LineElementType[] = ["arrow", "passLine"];

export function isLineElementType(
  type: BoardElementType,
): type is LineElementType {
  return (LINE_TYPES as string[]).includes(type);
}

function createId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function createPointElement(
  type: PointElementType,
  x: number,
  y: number,
): BoardElement {
  return { id: createId(), type, x, y, rotation: 0, label: "" };
}

/**
 * Line/arrow elements always store their local vector as a horizontal
 * segment (endY = 0) with the visual direction fully captured by
 * `rotation`. This keeps the Konva Transformer's left/right anchors
 * (used to reshape length) aligned with the line's own axis instead of
 * the stage's, regardless of which way the arrow points.
 */
export function createLineElement(
  type: LineElementType,
  x: number,
  y: number,
  length: number = DEFAULT_LINE_LENGTH,
  rotationDeg: number = 0,
): BoardElement {
  return {
    id: createId(),
    type,
    x,
    y,
    rotation: rotationDeg,
    endX: length,
    endY: 0,
  };
}

export function createLineElementFromDrag(
  type: LineElementType,
  start: { x: number; y: number },
  end: { x: number; y: number },
): BoardElement {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const dragLength = Math.hypot(dx, dy);
  // A tap without a meaningful drag (dragLength below the minimum) falls
  // back to the roomier default length instead of a barely-visible stub -
  // coaches often tap a line tool once before discovering the drag gesture.
  if (dragLength < MIN_LINE_LENGTH) {
    return createLineElement(type, start.x, start.y);
  }
  const rotationDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
  return createLineElement(type, start.x, start.y, dragLength, rotationDeg);
}
