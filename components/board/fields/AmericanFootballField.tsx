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
const ZOOM_YARDS = 30; // width of the close-up working section

export const AF_FULL_WIDTH = 1200;
export const AF_FULL_HEIGHT = 520;

const PX_PER_YARD = (AF_FULL_WIDTH - MARGIN * 2) / TOTAL_YARDS;

export const AF_ZOOM_WIDTH = Math.round(
  ZOOM_YARDS * PX_PER_YARD + MARGIN * 2,
);
export const AF_ZOOM_HEIGHT = AF_FULL_HEIGHT;

export function AmericanFootballField({
  modeId,
  width,
  height,
}: FieldRendererProps) {
  return (
    <Layer listening={false}>
      <Rect x={0} y={0} width={width} height={height} fill={TURF_COLOR} />
      {modeId === "zoom" ? (
        <ZoomSection width={width} height={height} />
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

// A cropped, larger-scale working area around a stretch of the field -
// no end zones, just yard lines/hash marks and a dashed line-of-scrimmage
// guide, matching the close-up view coaches actually draw drills on.
function ZoomSection({ width, height }: { width: number; height: number }) {
  const playW = width - MARGIN * 2;
  const playH = height - MARGIN * 2;
  const pxPerYard = playW / ZOOM_YARDS;
  const hashInset = playH * 0.3;

  const marks = [];
  for (let i = 0; i <= ZOOM_YARDS; i += 5) {
    const x = MARGIN + i * pxPerYard;
    marks.push(
      <Line
        key={`zl-${i}`}
        points={[x, MARGIN, x, height - MARGIN]}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH * 0.7}
        opacity={0.75}
      />,
      <Line
        key={`zh1-${i}`}
        points={[x - 4, MARGIN + hashInset, x + 4, MARGIN + hashInset]}
        stroke={LINE_COLOR}
        strokeWidth={2}
      />,
      <Line
        key={`zh2-${i}`}
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
  }

  const centerX = width / 2;
  return (
    <Group>
      {marks}
      <Line
        points={[centerX, MARGIN, centerX, height - MARGIN]}
        stroke="#facc15"
        strokeWidth={2}
        dash={[6, 6]}
        opacity={0.8}
      />
      <Text
        x={centerX + 6}
        y={MARGIN + 4}
        text="LOS"
        fontSize={12}
        fontStyle="bold"
        fill="#facc15"
      />
    </Group>
  );
}
