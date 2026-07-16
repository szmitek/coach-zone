import {
  distance,
  smoothPathPoints,
  wavyPathPoints,
} from "@/lib/board/path";
import type { BoardPoint } from "@/lib/board/types";

export interface RevealedPath {
  /** Points to render so far - always starts at the path's true start. */
  points: BoardPoint[];
  /** The current drawing tip (last revealed point), or null before anything is revealed. */
  tip: BoardPoint | null;
  complete: boolean;
}

/**
 * Same render pipeline the real board uses (PathElementNode /
 * TacticsBoard's drawing preview): curve through the tapped points first
 * (centripetal Catmull-Rom), then apply the wavy offset on top - then walks
 * the resulting polyline by arc length up to `progress` (0..1), so a path
 * "draws itself" as a smooth, constant-speed line growing from its start
 * rather than jumping vertex to vertex.
 */
export function revealPathPoints(
  points: BoardPoint[],
  curved: boolean,
  wavy: boolean,
  progress: number,
): RevealedPath {
  if (points.length < 2 || progress <= 0) {
    return { points: points.slice(0, points.length > 0 ? 1 : 0), tip: points[0] ?? null, complete: false };
  }

  const curvedPoints = curved ? smoothPathPoints(points) : points;
  const renderPoints = wavy ? wavyPathPoints(curvedPoints) : curvedPoints;

  if (progress >= 1) {
    return { points: renderPoints, tip: renderPoints[renderPoints.length - 1], complete: true };
  }

  const segmentLengths: number[] = [];
  let total = 0;
  for (let i = 0; i < renderPoints.length - 1; i++) {
    const len = distance(renderPoints[i], renderPoints[i + 1]);
    segmentLengths.push(len);
    total += len;
  }
  if (total <= 0) {
    return { points: [renderPoints[0]], tip: renderPoints[0], complete: false };
  }

  const targetLen = total * progress;
  const result: BoardPoint[] = [renderPoints[0]];
  let travelled = 0;
  for (let i = 0; i < segmentLengths.length; i++) {
    const segLen = segmentLengths[i];
    if (travelled + segLen >= targetLen) {
      const t = segLen > 0 ? (targetLen - travelled) / segLen : 0;
      const a = renderPoints[i];
      const b = renderPoints[i + 1];
      const tip = { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
      result.push(tip);
      return { points: result, tip, complete: false };
    }
    travelled += segLen;
    result.push(renderPoints[i + 1]);
  }

  const tip = renderPoints[renderPoints.length - 1];
  return { points: result, tip, complete: false };
}
