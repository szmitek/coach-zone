"use client";

import { Arc, Group, Layer, Line, Rect } from "react-konva";
import type { FieldRendererProps } from "@/lib/board/sports/types";

const MARGIN = 24;
const LINE_COLOR = "#f8fafc";
const LINE_WIDTH = 3;
const FLOOR_COLOR = "#2563a8";

// IHF reference dimensions (metres) - realistic proportions, same spirit
// as SoccerField's 105x68, not tournament-grade precision.
const COURT_LENGTH = 40;
const COURT_WIDTH = 20;
const HALF_DEPTH = 20; // centre line to goal line
const GOAL_AREA_R = 6;
const FREE_THROW_R = 9;
const FREE_THROW_DASH = [10, 8];
const PENALTY_MARK_DEPTH = 7;
const PENALTY_MARK_LEN = 1;
const GOAL_WIDTH = 3;
const GOAL_DEPTH = 0.8;

export function HandballField({ modeId, width, height }: FieldRendererProps) {
  return (
    <Layer listening={false}>
      <Rect x={0} y={0} width={width} height={height} fill={FLOOR_COLOR} />
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

// One goal's area/free-throw lines: each is a curve made of two quarter
// circles centred on the goalposts (radius R) joined by a straight
// segment parallel to the goal line - the D shape used for both the 6m
// and 9m lines, which share the same post centres and only differ in R.
// `goalX`/`dir` follow SoccerField's left/right goal convention.
function GoalCurve({
  goalX,
  centerY,
  dir,
  goalHalfWidth,
  radiusScale,
  dash,
}: {
  goalX: number;
  centerY: number;
  dir: 1 | -1;
  goalHalfWidth: number;
  radiusScale: number;
  dash?: number[];
}) {
  const post1Y = centerY - goalHalfWidth;
  const post2Y = centerY + goalHalfWidth;
  const lineX = goalX + dir * radiusScale;

  return (
    <Group>
      <Arc
        x={goalX}
        y={post1Y}
        innerRadius={radiusScale}
        outerRadius={radiusScale}
        rotation={dir === 1 ? 270 : 180}
        angle={90}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
        dash={dash}
      />
      <Arc
        x={goalX}
        y={post2Y}
        innerRadius={radiusScale}
        outerRadius={radiusScale}
        rotation={dir === 1 ? 0 : 90}
        angle={90}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
        dash={dash}
      />
      <Line
        points={[lineX, post1Y, lineX, post2Y]}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
        dash={dash}
      />
    </Group>
  );
}

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
  const goalHalfWidth = (GOAL_WIDTH * scaleY) / 2;
  const penaltyX = goalX + dir * PENALTY_MARK_DEPTH * scaleX;
  const penaltyHalfLen = (PENALTY_MARK_LEN * scaleY) / 2;
  const goalDepth = GOAL_DEPTH * scaleX;

  return (
    <Group>
      <GoalCurve
        goalX={goalX}
        centerY={centerY}
        dir={dir}
        goalHalfWidth={goalHalfWidth}
        radiusScale={GOAL_AREA_R * avgScale}
      />
      <GoalCurve
        goalX={goalX}
        centerY={centerY}
        dir={dir}
        goalHalfWidth={goalHalfWidth}
        radiusScale={FREE_THROW_R * avgScale}
        dash={FREE_THROW_DASH}
      />
      <Line
        points={[
          penaltyX,
          centerY - penaltyHalfLen,
          penaltyX,
          centerY + penaltyHalfLen,
        ]}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      <Rect
        x={dir === 1 ? goalX - goalDepth : goalX}
        y={centerY - goalHalfWidth}
        width={goalDepth}
        height={goalHalfWidth * 2}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
    </Group>
  );
}

// Same shapes as EndMarkings, rotated 90°: the goal sits at the bottom
// (y axis is now the depth/goal axis, x is the width axis) - the
// orientation SoccerField and BasketballField use for their half views.
function HalfEndMarkings({
  centerX,
  goalY,
  scaleX,
  scaleY,
  avgScale,
}: {
  centerX: number;
  goalY: number;
  scaleX: number;
  scaleY: number;
  avgScale: number;
}) {
  const goalHalfWidth = (GOAL_WIDTH * scaleX) / 2;
  const penaltyY = goalY - PENALTY_MARK_DEPTH * scaleY;
  const penaltyHalfLen = (PENALTY_MARK_LEN * scaleX) / 2;
  const goalDepth = GOAL_DEPTH * scaleY;
  const post1X = centerX - goalHalfWidth;
  const post2X = centerX + goalHalfWidth;

  function halfGoalCurve(radiusScale: number, dash?: number[]) {
    const lineY = goalY - radiusScale;
    return (
      <Group>
        <Arc
          x={post1X}
          y={goalY}
          innerRadius={radiusScale}
          outerRadius={radiusScale}
          rotation={180}
          angle={90}
          stroke={LINE_COLOR}
          strokeWidth={LINE_WIDTH}
          dash={dash}
        />
        <Arc
          x={post2X}
          y={goalY}
          innerRadius={radiusScale}
          outerRadius={radiusScale}
          rotation={270}
          angle={90}
          stroke={LINE_COLOR}
          strokeWidth={LINE_WIDTH}
          dash={dash}
        />
        <Line
          points={[post1X, lineY, post2X, lineY]}
          stroke={LINE_COLOR}
          strokeWidth={LINE_WIDTH}
          dash={dash}
        />
      </Group>
    );
  }

  return (
    <Group>
      {halfGoalCurve(GOAL_AREA_R * avgScale)}
      {halfGoalCurve(FREE_THROW_R * avgScale, FREE_THROW_DASH)}
      <Line
        points={[
          centerX - penaltyHalfLen,
          penaltyY,
          centerX + penaltyHalfLen,
          penaltyY,
        ]}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      <Rect
        x={centerX - goalHalfWidth}
        y={goalY}
        width={goalHalfWidth * 2}
        height={goalDepth}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
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
// (top) to goal line (bottom) - the same rotation SoccerField and
// BasketballField use for their half views.
function HalfCourtMarkings({ width, height }: { width: number; height: number }) {
  const playW = width - MARGIN * 2;
  const playH = height - MARGIN * 2;
  const scaleX = playW / COURT_WIDTH;
  const scaleY = playH / HALF_DEPTH;
  const avgScale = (scaleX + scaleY) / 2;
  const centerX = width / 2;
  const goalY = height - MARGIN;

  return (
    <HalfEndMarkings
      centerX={centerX}
      goalY={goalY}
      scaleX={scaleX}
      scaleY={scaleY}
      avgScale={avgScale}
    />
  );
}
