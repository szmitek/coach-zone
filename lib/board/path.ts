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

const SAMPLES_PER_SEGMENT = 12;
// Centripetal parameterization (alpha = 0.5) - unlike the uniform/chordal
// variants, this keeps the curve from looping or bulging past its control
// points even when they're unevenly spaced, which is exactly what a
// hand-tapped route path looks like.
const CENTRIPETAL_ALPHA = 0.5;
const EPS = 1e-4;

/**
 * Samples a dense polyline that curves smoothly through every point in
 * `points` (a centripetal Catmull-Rom spline), passed straight through to
 * Konva with tension 0 - Konva's own `tension` prop is a uniform spline
 * that overshoots and self-intersects for the kind of unevenly-spaced
 * points a coach taps out by hand, so this replaces it entirely rather
 * than trying to tune it.
 */
export function smoothPathPoints(points: BoardPoint[]): BoardPoint[] {
  if (points.length < 3) return points;

  // Duplicate the end points so every real point gets a full 4-point
  // window (p0,p1,p2,p3) to interpolate between p1 and p2.
  const padded = [points[0], ...points, points[points.length - 1]];
  const result: BoardPoint[] = [padded[1]];

  for (let i = 0; i < padded.length - 3; i++) {
    const p0 = padded[i];
    const p1 = padded[i + 1];
    const p2 = padded[i + 2];
    const p3 = padded[i + 3];

    const d01 = Math.max(Math.pow(distance(p0, p1), CENTRIPETAL_ALPHA), EPS);
    const d12 = Math.max(Math.pow(distance(p1, p2), CENTRIPETAL_ALPHA), EPS);
    const d23 = Math.max(Math.pow(distance(p2, p3), CENTRIPETAL_ALPHA), EPS);
    const t0 = 0;
    const t1 = t0 + d01;
    const t2 = t1 + d12;
    const t3 = t2 + d23;

    for (let s = 1; s <= SAMPLES_PER_SEGMENT; s++) {
      const t = t1 + ((t2 - t1) * s) / SAMPLES_PER_SEGMENT;
      result.push(catmullRomAt(p0, p1, p2, p3, t0, t1, t2, t3, t));
    }
  }

  return result;
}

function lerpPoint(a: BoardPoint, b: BoardPoint, t: number): BoardPoint {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

// Barry-Goldman formulation of the Catmull-Rom spline at parameter `t`
// within [t1, t2], given each control point's own parameter value.
function catmullRomAt(
  p0: BoardPoint,
  p1: BoardPoint,
  p2: BoardPoint,
  p3: BoardPoint,
  t0: number,
  t1: number,
  t2: number,
  t3: number,
  t: number,
): BoardPoint {
  const a1 = lerpPoint(p0, p1, (t - t0) / (t1 - t0 || EPS));
  const a2 = lerpPoint(p1, p2, (t - t1) / (t2 - t1 || EPS));
  const a3 = lerpPoint(p2, p3, (t - t2) / (t3 - t2 || EPS));
  const b1 = lerpPoint(a1, a2, (t - t0) / (t2 - t0 || EPS));
  const b2 = lerpPoint(a2, a3, (t - t1) / (t3 - t1 || EPS));
  return lerpPoint(b1, b2, (t - t1) / (t2 - t1 || EPS));
}

/**
 * Finds the closest point on the polyline's straight segments (not the
 * smoothed curve rendered on screen) to `target`. Used to insert a new
 * waypoint when the coach double-taps a path to reshape it - a close
 * enough approximation since the centripetal Catmull-Rom curve passes
 * through every control point and stays close to its control polygon.
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
