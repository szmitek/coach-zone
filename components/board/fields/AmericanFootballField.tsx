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
const PLAY_LOS_FRACTION = 0.65; // how far down the canvas the LOS sits - the lower third stays open below it for the backfield/QB, the rest above is route space
const PLAY_REFERENCE_YARDS = 30; // depth reference grid drawn above the LOS; routes may run on past it onto clean turf
const PLAY_DEPTH_LINE_STEP_YARDS = 10; // spacing between the faint depth lines - sparse background texture, not a numbered ladder
const PLAY_HASH_INSET_RATIO = 1 / 3; // dashed vertical hash columns sit this far in from each side - i.e. at 1/3 and 2/3 of the width

export const AF_FULL_WIDTH = 1200;
export const AF_FULL_HEIGHT = 520;

const PX_PER_YARD = (AF_FULL_WIDTH - MARGIN * 2) / TOTAL_YARDS;

export const AF_REDZONE_WIDTH = Math.round(
  (ENDZONE_YARDS + REDZONE_WORKING_YARDS) * PX_PER_YARD + MARGIN * 2,
);
export const AF_REDZONE_HEIGHT = AF_FULL_HEIGHT;

// Landscape play-card canvas, modelled on a real hand-drawn play card: wider
// than tall (~3:2) so the LOS reads as a wide anchor with routes fanning up
// above it, not a tall narrow strip.
export const AF_PLAY_WIDTH = 780;
export const AF_PLAY_HEIGHT = 520;

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

// A landscape play-card canvas for drawing a single play, styled after a
// real hand-drawn play card rather than a zoomed slice of FullField: no end
// zones, no goalposts, no yard numbers. Downfield is up - the LOS is a bold
// horizontal anchor low in the frame, a formation has room below it, and
// routes run up into the space above it. Two dashed vertical hash columns
// run the full height as the card's signature texture, with only a few
// faint horizontal depth lines behind them for route-depth reference.
function PlayField({ width, height }: { width: number; height: number }) {
  const playW = width - MARGIN * 2;
  const playH = height - MARGIN * 2;
  const pxPerYard = playW / FIELD_WIDTH_YARDS;
  const losY = MARGIN + playH * PLAY_LOS_FRACTION;

  const depthLines = [];
  for (
    let yard = PLAY_DEPTH_LINE_STEP_YARDS;
    yard <= PLAY_REFERENCE_YARDS;
    yard += PLAY_DEPTH_LINE_STEP_YARDS
  ) {
    const y = losY - yard * pxPerYard;
    if (y - MARGIN < 20) break;
    depthLines.push(
      <Line
        key={`pl-${yard}`}
        points={[MARGIN, y, width - MARGIN, y]}
        stroke={LINE_COLOR}
        strokeWidth={1.5}
        opacity={0.35}
      />,
    );
  }

  const hashX1 = MARGIN + playW * PLAY_HASH_INSET_RATIO;
  const hashX2 = MARGIN + playW * (1 - PLAY_HASH_INSET_RATIO);

  return (
    <Group>
      {depthLines}
      {/* Dashed hash columns - the play card's defining mark - run the full
          height so they read as constant background grain rather than
          per-yard ticks. */}
      <Line
        points={[hashX1, MARGIN, hashX1, height - MARGIN]}
        stroke={LINE_COLOR}
        strokeWidth={2}
        opacity={0.6}
        dash={[12, 8]}
      />
      <Line
        points={[hashX2, MARGIN, hashX2, height - MARGIN]}
        stroke={LINE_COLOR}
        strokeWidth={2}
        opacity={0.6}
        dash={[12, 8]}
      />
      {/* Line of scrimmage - the anchor the whole play sits on. Thicker
          than every other line here, and drawn last so it stays crisp
          on top. */}
      <Line
        points={[MARGIN, losY, width - MARGIN, losY]}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH * 2}
      />
    </Group>
  );
}
