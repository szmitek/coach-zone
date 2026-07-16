"use client";

import { Arrow, Circle, Line } from "react-konva";
import { flattenPoints } from "@/lib/board/path";
import { easeInOutCubic, easeOutCubic, timedProgress } from "@/lib/board/showcase/easing";
import { revealPathPoints } from "@/lib/board/showcase/reveal";
import type { ShowcasePath } from "@/lib/board/showcase/types";

// Same styling TacticsBoard.tsx uses for the in-progress point markers
// while a coach is actively drawing a route on the real board (line 690) -
// reusing it here signals "this is being drawn right now", the same way it
// does live.
const DRAWING_TIP_COLOR = "#10b981";
const ARROWHEAD_SETTLE_MS = 220;

export function AnimatedPath({ path, elapsed }: { path: ShowcasePath; elapsed: number }) {
  const progress = timedProgress(elapsed, path.startAt, path.duration, easeInOutCubic);
  if (progress <= 0) return null;

  const revealed = revealPathPoints(path.points, Boolean(path.curved), Boolean(path.wavy), progress);
  if (revealed.points.length < 2) return null;

  const flat = flattenPoints(revealed.points);
  const arrowheadProgress = revealed.complete
    ? timedProgress(elapsed, path.startAt + path.duration, ARROWHEAD_SETTLE_MS, easeOutCubic)
    : 0;

  return (
    <>
      {path.headStyle === "arrow" && revealed.complete ? (
        <Arrow
          points={flat}
          tension={0}
          stroke={path.color}
          fill={path.color}
          strokeWidth={path.strokeWidth}
          dash={path.dash}
          pointerLength={14 * arrowheadProgress}
          pointerWidth={14 * arrowheadProgress}
          lineCap="round"
          lineJoin="round"
          listening={false}
        />
      ) : (
        <Line
          points={flat}
          tension={0}
          stroke={path.color}
          strokeWidth={path.strokeWidth}
          dash={path.dash}
          lineCap="round"
          lineJoin="round"
          listening={false}
        />
      )}
      {!revealed.complete && revealed.tip && (
        <Circle
          x={revealed.tip.x}
          y={revealed.tip.y}
          radius={7}
          fill={DRAWING_TIP_COLOR}
          stroke="#ffffff"
          strokeWidth={1.5}
          listening={false}
        />
      )}
    </>
  );
}
