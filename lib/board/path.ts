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

// How far a synthesized midpoint bulges off the straight line between two
// points, as a fraction of their distance apart - gives a 2-point curved
// path (e.g. a basketball shot or a volleyball trajectory, tapped as just
// a start and end point) a visible arc instead of rendering dead straight,
// since Catmull-Rom needs 3 points to bend at all.
const ARC_BULGE_RATIO = 0.18;

function withArcMidpoint(points: BoardPoint[]): BoardPoint[] {
  const [a, b] = points;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  // Perpendicular to a->b, rotated so the bulge is consistently on one
  // side regardless of which direction the coach happened to draw in.
  const perpX = -dy / len;
  const perpY = dx / len;
  const bulge = len * ARC_BULGE_RATIO;
  return [
    a,
    { x: (a.x + b.x) / 2 + perpX * bulge, y: (a.y + b.y) / 2 + perpY * bulge },
    b,
  ];
}

/**
 * Samples a dense polyline that curves smoothly through every point in
 * `points` (a centripetal Catmull-Rom spline), passed straight through to
 * Konva with tension 0 - Konva's own `tension` prop is a uniform spline
 * that overshoots and self-intersects for the kind of unevenly-spaced
 * points a coach taps out by hand, so this replaces it entirely rather
 * than trying to tune it. Exactly 2 points get a synthesized midpoint
 * bulge first (see withArcMidpoint) so a curved 2-point path still arcs.
 */
export function smoothPathPoints(points: BoardPoint[]): BoardPoint[] {
  if (points.length < 2) return points;
  const source = points.length === 2 ? withArcMidpoint(points) : points;

  // Duplicate the end points so every real point gets a full 4-point
  // window (p0,p1,p2,p3) to interpolate between p1 and p2.
  const padded = [source[0], ...source, source[source.length - 1]];
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

export interface PolylineMark {
  point: BoardPoint;
  /** Unit tangent of the segment this mark falls on. */
  dir: BoardPoint;
}

/**
 * Walks the polyline `points` describe and drops evenly-spaced marks along
 * its total arc length (roughly every `spacing` px - the actual step is
 * `total / round(total / spacing)` so a mark always lands exactly on both
 * endpoints). Used to lay out ladder rungs and a hurdle row along a
 * stretchable 2-point (start -> end) element: since length/angle come
 * entirely from `points`, dragging either endpoint to resize/rotate the
 * element is enough to reflow every mark - no extra geometry to persist.
 */
export function markPointsAlongPolyline(
  points: BoardPoint[],
  spacing: number,
): PolylineMark[] {
  if (points.length < 2) return [];
  const segs: { a: BoardPoint; b: BoardPoint; len: number }[] = [];
  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const len = distance(a, b);
    segs.push({ a, b, len });
    total += len;
  }
  if (total < EPS) return [{ point: points[0], dir: { x: 1, y: 0 } }];

  const steps = Math.max(1, Math.round(total / spacing));
  const marks: PolylineMark[] = [];
  let segIndex = 0;
  let segStart = 0;
  for (let s = 0; s <= steps; s++) {
    const d = (s / steps) * total;
    while (
      segIndex < segs.length - 1 &&
      d > segStart + segs[segIndex].len + EPS
    ) {
      segStart += segs[segIndex].len;
      segIndex++;
    }
    const seg = segs[segIndex];
    const len = seg.len || 1;
    const t = seg.len > EPS ? (d - segStart) / seg.len : 0;
    const dx = seg.b.x - seg.a.x;
    const dy = seg.b.y - seg.a.y;
    marks.push({
      point: { x: seg.a.x + dx * t, y: seg.a.y + dy * t },
      dir: { x: dx / len, y: dy / len },
    });
  }
  return marks;
}

const WAVE_AMPLITUDE = 9;
const WAVE_LENGTH = 26;
const WAVE_STEP = 6;

/**
 * Samples a zigzag/squiggle along the polyline `points` describe, offset
 * perpendicular to the direction of travel by a sine wave - used for the
 * basketball dribble tool, where a plain line would look like a pass
 * rather than a ball being bounced along the way. Arc length (not per-
 * segment progress) drives the wave phase, so it stays continuous across
 * unevenly spaced tapped points instead of resetting at each one.
 */
export function wavyPathPoints(points: BoardPoint[]): BoardPoint[] {
  if (points.length < 2) return points;
  const result: BoardPoint[] = [];
  let travelled = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const segLen = distance(a, b);
    if (segLen < EPS) continue;
    const dirX = (b.x - a.x) / segLen;
    const dirY = (b.y - a.y) / segLen;
    const perpX = -dirY;
    const perpY = dirX;
    const steps = Math.max(1, Math.round(segLen / WAVE_STEP));
    for (let s = i === 0 ? 0 : 1; s <= steps; s++) {
      const d = (s / steps) * segLen;
      const along = travelled + d;
      const offset =
        Math.sin((along / WAVE_LENGTH) * Math.PI * 2) * WAVE_AMPLITUDE;
      result.push({
        x: a.x + dirX * d + perpX * offset,
        y: a.y + dirY * d + perpY * offset,
      });
    }
    travelled += segLen;
  }
  return result;
}
