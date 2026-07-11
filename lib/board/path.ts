import type { BoardPoint } from "./types";

export function flattenPoints(points: BoardPoint[]): number[] {
  return points.flatMap((p) => [p.x, p.y]);
}

export function distance(a: BoardPoint, b: BoardPoint): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function translatePoints(
  points: BoardPoint[],
  dx: number,
  dy: number,
): BoardPoint[] {
  return points.map((p) => ({ x: p.x + dx, y: p.y + dy }));
}

/**
 * Unit tangent vector at the end of the path (direction of the final
 * segment), used to orient the block "T-bar" end cap.
 */
export function endTangent(points: BoardPoint[]): BoardPoint {
  const a = points[points.length - 2] ?? points[0];
  const b = points[points.length - 1];
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  return { x: dx / len, y: dy / len };
}

export interface NearestPointResult {
  /** Insert a new point after this index in the points array. */
  segmentIndex: number;
  point: BoardPoint;
  distance: number;
}

/**
 * Finds the closest point on the polyline's straight segments (not the
 * smoothed curve rendered on screen) to `target`. Used to insert a new
 * waypoint when the coach double-taps a path to reshape it - a close
 * enough approximation since the visible curve stays near its control
 * polygon for the tension values this board uses.
 */
export function nearestPointOnPath(
  points: BoardPoint[],
  target: BoardPoint,
): NearestPointResult {
  let best: NearestPointResult | null = null;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const abx = b.x - a.x;
    const aby = b.y - a.y;
    const lenSq = abx * abx + aby * aby || 1;
    let t = ((target.x - a.x) * abx + (target.y - a.y) * aby) / lenSq;
    t = Math.max(0, Math.min(1, t));
    const point = { x: a.x + abx * t, y: a.y + aby * t };
    const dist = distance(point, target);
    if (!best || dist < best.distance) {
      best = { segmentIndex: i, point, distance: dist };
    }
  }
  // points always has >=2 entries whenever this is called (paths are
  // never created/rendered with fewer), so best is always set.
  return best as NearestPointResult;
}
