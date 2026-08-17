"use client";

import { Group, Layer, Line, Rect, Text } from "react-konva";
import type { FieldRendererProps } from "@/lib/board/sports/types";

const MARGIN = 24;
const LINE_COLOR = "#f8fafc";
const LINE_WIDTH = 3;
const TURF_COLOR = "#1f6f3d";
const ENDZONE_COLOR = "#15532d";

const TOTAL_YARDS = 120; // 100-yard field + two 10-yard end zones
const ENDZONE_YARDS = 10;
const REDZONE_WORKING_YARDS = 25; // yards of live field kept in view past the goal line
const FIELD_WIDTH_YARDS = 160 / 3; // 53 1/3 yd sideline-to-sideline
const PLAY_LOS_FRACTION = 0.75; // how far down the canvas the LOS sits - lower third, most height left above it for routes
const PLAY_REFERENCE_YARDS = 30; // depth reference grid drawn above the LOS; routes may run on past it onto clean turf

export const AF_FULL_WIDTH = 1200;
export const AF_FULL_HEIGHT = 520;

const PX_PER_YARD = (AF_FULL_WIDTH - MARGIN * 2) / TOTAL_YARDS;

export const AF_REDZONE_WIDTH = Math.round(
  (ENDZONE_YARDS + REDZONE_WORKING_YARDS) * PX_PER_YARD + MARGIN * 2,
);
export const AF_REDZONE_HEIGHT = AF_FULL_HEIGHT;

// Portrait play-diagram canvas: tall enough for a route tree above the LOS
// while the field's full width still runs edge-to-edge horizontally.
export const AF_PLAY_WIDTH = 620;
export const AF_PLAY_HEIGHT = 820;

export function AmericanFootballField({
  modeId,
  width,
  height,
}: FieldRendererProps) {
  return (
    <Layer listening={false}>
      <Rect x={0} y={0} width={width} height={height} fill={TURF_COLOR} />
      {modeId === "redzone" ? (
        <RedZoneSection width={width} height={height} />
      ) : modeId === "play" ? (
        <PlayField width={width} height={height} />
      ) : (
        <FullField width={width} height={height} />
      )}
      <Rect
        x={MARGIN}
        y={MARGIN}
        width={width - MARGIN * 2}
        height={height - MARGIN * 2}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
    </Layer>
  );
}

function FullField({ width, height }: { width: number; height: number }) {
  const playW = width - MARGIN * 2;
  const playH = height - MARGIN * 2;
  const pxPerYard = playW / TOTAL_YARDS;
  const endzoneWidth = ENDZONE_YARDS * pxPerYard;
  const hashInset = playH * 0.3;

  const marks = [];
  for (let yard = 0; yard <= 100; yard += 5) {
    const x = MARGIN + endzoneWidth + yard * pxPerYard;
    const isMajor = yard % 10 === 0;
    marks.push(
      <Line
        key={`yl-${yard}`}
        points={[x, MARGIN, x, height - MARGIN]}
        stroke={LINE_COLOR}
        strokeWidth={isMajor ? LINE_WIDTH : LINE_WIDTH * 0.6}
        opacity={isMajor ? 1 : 0.6}
      />,
      <Line
        key={`h1-${yard}`}
        points={[x - 4, MARGIN + hashInset, x + 4, MARGIN + hashInset]}
        stroke={LINE_COLOR}
        strokeWidth={2}
      />,
      <Line
        key={`h2-${yard}`}
        points={[
          x - 4,
          height - MARGIN - hashInset,
          x + 4,
          height - MARGIN - hashInset,
        ]}
        stroke={LINE_COLOR}
        strokeWidth={2}
      />,
    );
    if (isMajor && yard !== 0 && yard !== 100) {
      const number = yard <= 50 ? yard : 100 - yard;
      marks.push(
        <Text
          key={`n1-${yard}`}
          x={x - 10}
          y={MARGIN + 8}
          text={String(number)}
          fontSize={16}
          fontStyle="bold"
          fill={LINE_COLOR}
        />,
        <Text
          key={`n2-${yard}`}
          x={x - 10}
          y={height - MARGIN - 26}
          text={String(number)}
          fontSize={16}
          fontStyle="bold"
          fill={LINE_COLOR}
        />,
      );
    }
  }

  return (
    <Group>
      <Rect
        x={MARGIN}
        y={MARGIN}
        width={endzoneWidth}
        height={playH}
        fill={ENDZONE_COLOR}
      />
      <Rect
        x={width - MARGIN - endzoneWidth}
        y={MARGIN}
        width={endzoneWidth}
        height={playH}
        fill={ENDZONE_COLOR}
      />
      <Line
        points={[
          MARGIN + endzoneWidth,
          MARGIN,
          MARGIN + endzoneWidth,
          height - MARGIN,
        ]}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      <Line
        points={[
          width - MARGIN - endzoneWidth,
          MARGIN,
          width - MARGIN - endzoneWidth,
          height - MARGIN,
        ]}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      {marks}
      <GoalPost x={MARGIN} centerY={height / 2} dir={-1} />
      <GoalPost x={width - MARGIN} centerY={height / 2} dir={1} />
    </Group>
  );
}

function GoalPost({
  x,
  centerY,
  dir,
}: {
  x: number;
  centerY: number;
  dir: 1 | -1;
}) {
  const crossbarHalf = 11;
  const uprightLength = 20;
  const baseX = x + dir * 6;
  return (
    <Group>
      <Line
        points={[
          baseX,
          centerY - crossbarHalf,
          baseX,
          centerY + crossbarHalf,
        ]}
        stroke={LINE_COLOR}
        strokeWidth={3}
      />
      <Line
        points={[
          baseX,
          centerY - crossbarHalf,
          baseX,
          centerY - crossbarHalf - uprightLength,
        ]}
        stroke={LINE_COLOR}
        strokeWidth={3}
      />
      <Line
        points={[
          baseX,
          centerY + crossbarHalf,
          baseX,
          centerY + crossbarHalf + uprightLength,
        ]}
        stroke={LINE_COLOR}
        strokeWidth={3}
      />
    </Group>
  );
}

// One end zone plus the ~25 working yards in front of it - where most of
// practice actually happens - at a larger scale than the full field.
// Same vertical yard-line/hash-mark grain as FullField so nothing
// flips orientation when switching views.
function RedZoneSection({ width, height }: { width: number; height: number }) {
  const playW = width - MARGIN * 2;
  const playH = height - MARGIN * 2;
  const pxPerYard = playW / (ENDZONE_YARDS + REDZONE_WORKING_YARDS);
  const endzoneWidth = ENDZONE_YARDS * pxPerYard;
  const goalLineX = MARGIN + endzoneWidth;
  const hashInset = playH * 0.3;

  const marks = [];
  for (let yard = 0; yard <= REDZONE_WORKING_YARDS; yard += 5) {
    const x = goalLineX + yard * pxPerYard;
    marks.push(
      <Line
        key={`rl-${yard}`}
        points={[x, MARGIN, x, height - MARGIN]}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH * 0.7}
        opacity={0.75}
      />,
      <Line
        key={`rh1-${yard}`}
        points={[x - 4, MARGIN + hashInset, x + 4, MARGIN + hashInset]}
        stroke={LINE_COLOR}
        strokeWidth={2}
      />,
      <Line
        key={`rh2-${yard}`}
        points={[
          x - 4,
          height - MARGIN - hashInset,
          x + 4,
          height - MARGIN - hashInset,
        ]}
        stroke={LINE_COLOR}
        strokeWidth={2}
      />,
    );
    if (yard !== 0) {
      marks.push(
        <Text
          key={`rn-${yard}`}
          x={x - 10}
          y={MARGIN + 8}
          text={String(yard)}
          fontSize={16}
          fontStyle="bold"
          fill={LINE_COLOR}
        />,
      );
    }
  }

  return (
    <Group>
      <Rect
        x={MARGIN}
        y={MARGIN}
        width={endzoneWidth}
        height={playH}
        fill={ENDZONE_COLOR}
      />
      {/* Goal line - the boundary between end zone and the field of play. */}
      <Line
        points={[goalLineX, MARGIN, goalLineX, height - MARGIN]}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      {marks}
      <GoalPost x={MARGIN} centerY={height / 2} dir={-1} />
    </Group>
  );
}

// A zoomed line-of-scrimmage canvas for drawing a single play, not the full
// field rotated: no end zones, no goalposts. Downfield is up - the LOS sits
// low in the frame so a formation has room below it and routes have most of
// the canvas to run into above it. The field's full WIDTH (not its length)
// runs edge-to-edge horizontally, so the yard-line/hash-mark grain is
// rotated 90° from FullField/RedZoneSection: yard lines are horizontal
// (constant y) and hash marks sit at two vertical insets.
function PlayField({ width, height }: { width: number; height: number }) {
  const playW = width - MARGIN * 2;
  const playH = height - MARGIN * 2;
  const pxPerYard = playW / FIELD_WIDTH_YARDS;
  const hashInset = playW * 0.3;
  const losY = MARGIN + playH * PLAY_LOS_FRACTION;

  const marks = [];
  for (let yard = 0; yard <= PLAY_REFERENCE_YARDS; yard += 5) {
    const y = losY - yard * pxPerYard;
    if (y - MARGIN < 20) break;
    if (yard !== 0) {
      marks.push(
        <Line
          key={`pl-${yard}`}
          points={[MARGIN, y, width - MARGIN, y]}
          stroke={LINE_COLOR}
          strokeWidth={LINE_WIDTH * 0.7}
          opacity={0.75}
        />,
        <Text
          key={`pn-${yard}`}
          x={MARGIN + 6}
          y={y - 18}
          text={String(yard)}
          fontSize={16}
          fontStyle="bold"
          fill={LINE_COLOR}
        />,
      );
    }
    marks.push(
      <Line
        key={`ph1-${yard}`}
        points={[MARGIN + hashInset, y - 4, MARGIN + hashInset, y + 4]}
        stroke={LINE_COLOR}
        strokeWidth={2}
      />,
      <Line
        key={`ph2-${yard}`}
        points={[
          width - MARGIN - hashInset,
          y - 4,
          width - MARGIN - hashInset,
          y + 4,
        ]}
        stroke={LINE_COLOR}
        strokeWidth={2}
      />,
    );
  }

  return (
    <Group>
      {marks}
      {/* Line of scrimmage - drawn last so it stays crisp above the fainter
          reference grid, at full LINE_WIDTH like the other modes' goal
          line / major yard lines. */}
      <Line
        points={[MARGIN, losY, width - MARGIN, losY]}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
    </Group>
  );
}
