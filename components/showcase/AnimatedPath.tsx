"use client";

import { Arrow, Circle, Line } from "react-konva";
import { endTangent, flattenPoints } from "@/lib/board/path";
import { easeInOutCubic, easeOutCubic, timedProgress } from "@/lib/board/showcase/easing";
import { revealPathPoints } from "@/lib/board/showcase/reveal";
import type { ShowcasePath } from "@/lib/board/showcase/types";
import type { BoardPoint } from "@/lib/board/types";
import { HurdleRow, LadderShape } from "./EquipmentPath";

// Same styling TacticsBoard.tsx uses for the in-progress point markers
// while a coach is actively drawing a route on the real board (line 690) -
// reusing it here signals "this is being drawn right now", the same way it
// does live.
const DRAWING_TIP_COLOR = "#10b981";
const ARROWHEAD_SETTLE_MS = 220;
// Matches PathElementNode's BlockBar - the perpendicular end-cap the real
// board draws for the "block" tool's headStyle: "bar".
const BLOCK_BAR_HALF_LENGTH = 11;

export function AnimatedPath({ path, elapsed }: { path: ShowcasePath; elapsed: number }) {
  const progress = timedProgress(elapsed, path.startAt, path.duration, easeInOutCubic);
  if (progress <= 0) return null;

  const revealed = revealPathPoints(path.points, Boolean(path.curved), Boolean(path.wavy), progress);
  if (revealed.points.length < 2) return null;

  if (path.kind === "ladder" || path.kind === "hurdles") {
    const Shape = path.kind === "ladder" ? LadderShape : HurdleRow;
    return <Shape points={revealed.points} strokeWidth={path.strokeWidth} />;
  }

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
      {path.headStyle === "bar" && revealed.complete && (
        <BlockBarEnd points={revealed.points} color={path.color} strokeWidth={path.strokeWidth} />
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

function BlockBarEnd({
  points,
  color,
  strokeWidth,
}: {
  points: BoardPoint[];
  color: string;
  strokeWidth: number;
}) {
  const end = points[points.length - 1];
  const tangent = endTangent(points);
  const perp = { x: -tangent.y, y: tangent.x };
  const half = BLOCK_BAR_HALF_LENGTH;
  return (
    <Line
      points={[end.x - perp.x * half, end.y - perp.y * half, end.x + perp.x * half, end.y + perp.y * half]}
      stroke={color}
      strokeWidth={strokeWidth}
      lineCap="round"
      listening={false}
    />
  );
}
