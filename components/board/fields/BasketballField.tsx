"use client";

import { Arc, Circle, Group, Layer, Line, Rect } from "react-konva";
import type { FieldRendererProps } from "@/lib/board/sports/types";

const MARGIN = 24;
const LINE_COLOR = "#f8fafc";
const LINE_WIDTH = 3;
const FLOOR_DARK = "#c8823a";
const FLOOR_LIGHT = "#d4914a";

// FIBA reference dimensions (metres), used the same way SoccerField uses
// 105x68 - realistic proportions, not tournament-grade precision.
const COURT_LENGTH = 28;
const COURT_WIDTH = 15;
const HALF_DEPTH = 14; // centre line to baseline
const CENTER_CIRCLE_R = 1.8;
const KEY_WIDTH = 4.9;
const FT_LINE_DEPTH = 5.8;
const FT_CIRCLE_R = 1.8;
const THREE_POINT_R = 6.75;
const BASKET_DEPTH = 1.575; // baseline to hoop centre
const BACKBOARD_DEPTH = 1.2;
const BACKBOARD_WIDTH = 1.8;

export function BasketballField({ modeId, width, height }: FieldRendererProps) {
  return (
    <Layer listening={false}>
      <Floor width={width} height={height} />
      <Rect
        x={MARGIN}
        y={MARGIN}
        width={width - MARGIN * 2}
        height={height - MARGIN * 2}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      {modeId === "half" ? (
        <HalfCourtMarkings width={width} height={height} />
      ) : (
        <FullCourtMarkings width={width} height={height} />
      )}
    </Layer>
  );
}

function Floor({ width, height }: { width: number; height: number }) {
  return (
    <Group>
      <Rect x={0} y={0} width={width} height={height} fill={FLOOR_DARK} />
      <Rect
        x={MARGIN}
        y={MARGIN}
        width={width - MARGIN * 2}
        height={height - MARGIN * 2}
        fill={FLOOR_LIGHT}
      />
    </Group>
  );
}

// One basket end's markings: key, free-throw circle, three-point arc and
// hoop. `goalX`/`dir` follow SoccerField's convention (dir=1 grows into
// the court from a goal on the left, -1 from the right); `scaleX` maps
// the length axis, `scaleY`/`avgScale` the width axis and radii.
function EndMarkings({
  goalX,
  centerY,
  dir,
  scaleX,
  scaleY,
  avgScale,
}: {
  goalX: number;
  centerY: number;
  dir: 1 | -1;
  scaleX: number;
  scaleY: number;
  avgScale: number;
}) {
  const keyHalfWidth = (KEY_WIDTH * scaleY) / 2;
  const ftDepth = FT_LINE_DEPTH * scaleX;
  const ftCircleR = FT_CIRCLE_R * avgScale;
  const threeR = THREE_POINT_R * avgScale;
  const basketX = goalX + dir * BASKET_DEPTH * scaleX;
  const backboardX = goalX + dir * BACKBOARD_DEPTH * scaleX;
  const backboardHalf = (BACKBOARD_WIDTH * scaleY) / 2;

  // Three-point arc: centred on the hoop, clipped by the baseline. The
  // half-angle from the "into the court" direction to where the arc
  // meets the baseline is arccos(-depth/radius); see BasketballField's
  // sibling handball derivation in HandballField for the same technique.
  const depthRatio = (BASKET_DEPTH * scaleX) / threeR;
  const halfAngleDeg = (Math.acos(-depthRatio) * 180) / Math.PI;
  const rotation = dir === 1 ? -halfAngleDeg : 180 - halfAngleDeg;

  return (
    <Group>
      <Rect
        x={dir === 1 ? goalX : goalX - ftDepth}
        y={centerY - keyHalfWidth}
        width={ftDepth}
        height={keyHalfWidth * 2}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      <Circle
        x={goalX + dir * ftDepth}
        y={centerY}
        radius={ftCircleR}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      <Arc
        x={basketX}
        y={centerY}
        innerRadius={threeR}
        outerRadius={threeR}
        rotation={rotation}
        angle={halfAngleDeg * 2}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      <Line
        points={[
          backboardX,
          centerY - backboardHalf,
          backboardX,
          centerY + backboardHalf,
        ]}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      <Circle x={basketX} y={centerY} radius={5} stroke={LINE_COLOR} strokeWidth={2} />
    </Group>
  );
}

function FullCourtMarkings({ width, height }: { width: number; height: number }) {
  const playW = width - MARGIN * 2;
  const playH = height - MARGIN * 2;
  const scaleX = playW / COURT_LENGTH;
  const scaleY = playH / COURT_WIDTH;
  const avgScale = (scaleX + scaleY) / 2;
  const centerX = width / 2;
  const centerY = height / 2;

  return (
    <Group>
      <Line
        points={[centerX, MARGIN, centerX, height - MARGIN]}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      <Circle
        x={centerX}
        y={centerY}
        radius={CENTER_CIRCLE_R * avgScale}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      <EndMarkings
        goalX={MARGIN}
        centerY={centerY}
        dir={1}
        scaleX={scaleX}
        scaleY={scaleY}
        avgScale={avgScale}
      />
      <EndMarkings
        goalX={width - MARGIN}
        centerY={centerY}
        dir={-1}
        scaleX={scaleX}
        scaleY={scaleY}
        avgScale={avgScale}
      />
    </Group>
  );
}

// Half court: x = sideline-to-sideline (width axis), y = centre line
// (top) to baseline (bottom) - same rotation SoccerField uses for its
// half-pitch view.
function HalfCourtMarkings({ width, height }: { width: number; height: number }) {
  const playW = width - MARGIN * 2;
  const playH = height - MARGIN * 2;
  const scaleX = playW / COURT_WIDTH;
  const scaleY = playH / HALF_DEPTH;
  const avgScale = (scaleX + scaleY) / 2;
  const centerX = width / 2;
  const goalY = height - MARGIN;

  const keyHalfWidth = (KEY_WIDTH * scaleX) / 2;
  const ftDepth = FT_LINE_DEPTH * scaleY;
  const ftCircleR = FT_CIRCLE_R * avgScale;
  const threeR = THREE_POINT_R * avgScale;
  const basketY = goalY - BASKET_DEPTH * scaleY;
  const backboardY = goalY - BACKBOARD_DEPTH * scaleY;
  const backboardHalf = (BACKBOARD_WIDTH * scaleX) / 2;

  const depthRatio = (BASKET_DEPTH * scaleY) / threeR;
  const halfAngleDeg = (Math.acos(-depthRatio) * 180) / Math.PI;

  return (
    <Group>
      <Arc
        x={centerX}
        y={MARGIN}
        innerRadius={CENTER_CIRCLE_R * avgScale}
        outerRadius={CENTER_CIRCLE_R * avgScale}
        rotation={0}
        angle={180}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      <Rect
        x={centerX - keyHalfWidth}
        y={goalY - ftDepth}
        width={keyHalfWidth * 2}
        height={ftDepth}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      <Circle
        x={centerX}
        y={goalY - ftDepth}
        radius={ftCircleR}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      <Arc
        x={centerX}
        y={basketY}
        innerRadius={threeR}
        outerRadius={threeR}
        rotation={270 - halfAngleDeg}
        angle={halfAngleDeg * 2}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      <Line
        points={[
          centerX - backboardHalf,
          backboardY,
          centerX + backboardHalf,
          backboardY,
        ]}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      <Circle x={centerX} y={basketY} radius={5} stroke={LINE_COLOR} strokeWidth={2} />
    </Group>
  );
}
