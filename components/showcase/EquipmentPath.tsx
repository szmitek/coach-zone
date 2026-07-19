"use client";

import { Group, Line } from "react-konva";
import { flattenPoints, markPointsAlongPolyline } from "@/lib/board/path";
import type { BoardPoint } from "@/lib/board/types";

// Mirrors components/board/PathElementNode.tsx's LadderShape/HurdleRow
// constant-for-constant (spacing, gaps, colors) - a ladder or hurdle row
// placed in a showcase scene has to read as the exact same equipment the
// coach drags onto the real board, not an approximation of it. Dropped:
// the drag handles and hit-testing props, since nothing here is
// interactive.
const LADDER_RUNG_SPACING = 20;
const LADDER_RAIL_GAP = 24;
const LADDER_RUNG_OVERHANG = 5;
const HURDLE_SPACING = 42;
const HURDLE_BAR_HALF_WIDTH = 11;
const HURDLE_LEG_LENGTH = 7;

const EQUIPMENT_OUTLINE_COLOR = "#111827";
const LADDER_RAIL_COLOR = "#dc2626";
const LADDER_RUNG_COLOR = "#facc15";
const HURDLE_COLOR = "#dc2626";

export function LadderShape({
  points,
  strokeWidth,
}: {
  points: BoardPoint[];
  strokeWidth: number;
}) {
  if (points.length < 2) return null;
  const marks = markPointsAlongPolyline(points, LADDER_RUNG_SPACING);
  const half = LADDER_RAIL_GAP / 2;
  const railSide = (side: 1 | -1) =>
    flattenPoints(
      marks.map((m) => {
        const perp = { x: -m.dir.y, y: m.dir.x };
        return {
          x: m.point.x + perp.x * half * side,
          y: m.point.y + perp.y * half * side,
        };
      }),
    );
  const rail1 = railSide(1);
  const railNeg1 = railSide(-1);
  const rungStrokeWidth = Math.max(2, strokeWidth - 1);

  return (
    <Group listening={false}>
      <Line points={rail1} stroke={EQUIPMENT_OUTLINE_COLOR} strokeWidth={strokeWidth + 2.5} lineCap="round" lineJoin="round" />
      <Line points={rail1} stroke={LADDER_RAIL_COLOR} strokeWidth={strokeWidth} lineCap="round" lineJoin="round" />
      <Line points={railNeg1} stroke={EQUIPMENT_OUTLINE_COLOR} strokeWidth={strokeWidth + 2.5} lineCap="round" lineJoin="round" />
      <Line points={railNeg1} stroke={LADDER_RAIL_COLOR} strokeWidth={strokeWidth} lineCap="round" lineJoin="round" />
      {marks.map((m, i) => {
        const perp = { x: -m.dir.y, y: m.dir.x };
        const rungHalf = half + LADDER_RUNG_OVERHANG;
        const rungPoints = [
          m.point.x - perp.x * rungHalf,
          m.point.y - perp.y * rungHalf,
          m.point.x + perp.x * rungHalf,
          m.point.y + perp.y * rungHalf,
        ];
        return (
          <Group key={i}>
            <Line points={rungPoints} stroke={EQUIPMENT_OUTLINE_COLOR} strokeWidth={rungStrokeWidth + 2} lineCap="round" />
            <Line points={rungPoints} stroke={LADDER_RUNG_COLOR} strokeWidth={rungStrokeWidth} lineCap="round" />
          </Group>
        );
      })}
    </Group>
  );
}

export function HurdleRow({
  points,
  strokeWidth,
}: {
  points: BoardPoint[];
  strokeWidth: number;
}) {
  if (points.length < 2) return null;
  const marks = markPointsAlongPolyline(points, HURDLE_SPACING);
  const outlineWidth = strokeWidth + 2.5;

  return (
    <Group listening={false}>
      {marks.map((m, i) => {
        const perp = { x: -m.dir.y, y: m.dir.x };
        const barA = {
          x: m.point.x - perp.x * HURDLE_BAR_HALF_WIDTH,
          y: m.point.y - perp.y * HURDLE_BAR_HALF_WIDTH,
        };
        const barB = {
          x: m.point.x + perp.x * HURDLE_BAR_HALF_WIDTH,
          y: m.point.y + perp.y * HURDLE_BAR_HALF_WIDTH,
        };
        const legA = { x: barA.x + m.dir.x * HURDLE_LEG_LENGTH, y: barA.y + m.dir.y * HURDLE_LEG_LENGTH };
        const legB = { x: barB.x + m.dir.x * HURDLE_LEG_LENGTH, y: barB.y + m.dir.y * HURDLE_LEG_LENGTH };
        const barPoints = [barA.x, barA.y, barB.x, barB.y];
        const legAPoints = [barA.x, barA.y, legA.x, legA.y];
        const legBPoints = [barB.x, barB.y, legB.x, legB.y];
        return (
          <Group key={i}>
            <Line points={barPoints} stroke={EQUIPMENT_OUTLINE_COLOR} strokeWidth={outlineWidth} lineCap="round" />
            <Line points={legAPoints} stroke={EQUIPMENT_OUTLINE_COLOR} strokeWidth={outlineWidth} lineCap="round" />
            <Line points={legBPoints} stroke={EQUIPMENT_OUTLINE_COLOR} strokeWidth={outlineWidth} lineCap="round" />
            <Line points={barPoints} stroke={HURDLE_COLOR} strokeWidth={strokeWidth} lineCap="round" />
            <Line points={legAPoints} stroke={HURDLE_COLOR} strokeWidth={strokeWidth} lineCap="round" />
            <Line points={legBPoints} stroke={HURDLE_COLOR} strokeWidth={strokeWidth} lineCap="round" />
          </Group>
        );
      })}
    </Group>
  );
}
