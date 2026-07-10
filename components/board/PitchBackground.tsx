"use client";

import { Arc, Circle, Group, Layer, Line, Rect } from "react-konva";
import type { PitchMode } from "@/lib/board/types";

const MARGIN = 24;
const LINE_COLOR = "#f8fafc";
const LINE_WIDTH = 3;
const TURF_DARK = "#1f8a4c";
const TURF_LIGHT = "#22994f";

export function PitchBackground({
  mode,
  width,
  height,
}: {
  mode: PitchMode;
  width: number;
  height: number;
}) {
  return (
    <Layer listening={false}>
      <Turf width={width} height={height} />
      <Rect
        x={MARGIN}
        y={MARGIN}
        width={width - MARGIN * 2}
        height={height - MARGIN * 2}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      {mode === "full" ? (
        <FullPitchMarkings width={width} height={height} />
      ) : (
        <HalfPitchMarkings width={width} height={height} />
      )}
    </Layer>
  );
}

function Turf({ width, height }: { width: number; height: number }) {
  const stripeCount = 8;
  const stripeWidth = width / stripeCount;
  return (
    <Group>
      <Rect x={0} y={0} width={width} height={height} fill={TURF_DARK} />
      {Array.from({ length: stripeCount }, (_, i) =>
        i % 2 === 0 ? (
          <Rect
            key={i}
            x={i * stripeWidth}
            y={0}
            width={stripeWidth}
            height={height}
            fill={TURF_LIGHT}
          />
        ) : null,
      )}
    </Group>
  );
}

// x = pitch length axis, y = pitch width axis (touchline to touchline).
function FullPitchMarkings({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const playW = width - MARGIN * 2;
  const playH = height - MARGIN * 2;
  const scaleX = playW / 105;
  const scaleY = playH / 68;
  const avgScale = (scaleX + scaleY) / 2;
  const centerX = width / 2;
  const centerY = height / 2;

  const boxDepth = 16.5 * scaleX;
  const boxHalfWidth = 20.16 * scaleY;
  const sixDepth = 5.5 * scaleX;
  const sixHalfWidth = 9.16 * scaleY;
  const spotOffset = 11 * scaleX;
  const arcRadius = 9.15 * avgScale;
  const goalHalfWidth = 3.66 * scaleY;
  const goalDepth = 2 * scaleX;

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
        radius={arcRadius}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      <Circle x={centerX} y={centerY} radius={3} fill={LINE_COLOR} />

      {[
        { goalX: MARGIN, dir: 1 },
        { goalX: width - MARGIN, dir: -1 },
      ].map(({ goalX, dir }) => (
        <Group key={goalX}>
          <Rect
            x={dir === 1 ? goalX : goalX - boxDepth}
            y={centerY - boxHalfWidth}
            width={boxDepth}
            height={boxHalfWidth * 2}
            stroke={LINE_COLOR}
            strokeWidth={LINE_WIDTH}
          />
          <Rect
            x={dir === 1 ? goalX : goalX - sixDepth}
            y={centerY - sixHalfWidth}
            width={sixDepth}
            height={sixHalfWidth * 2}
            stroke={LINE_COLOR}
            strokeWidth={LINE_WIDTH}
          />
          <Circle
            x={goalX + dir * spotOffset}
            y={centerY}
            radius={3}
            fill={LINE_COLOR}
          />
          <Arc
            x={goalX + dir * spotOffset}
            y={centerY}
            innerRadius={arcRadius}
            outerRadius={arcRadius}
            rotation={dir === 1 ? -53 : 127}
            angle={106}
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
          <Arc
            x={goalX}
            y={dir === 1 ? MARGIN : height - MARGIN}
            innerRadius={2 * avgScale}
            outerRadius={2 * avgScale}
            rotation={dir === 1 ? 0 : 180}
            angle={90}
            stroke={LINE_COLOR}
            strokeWidth={LINE_WIDTH}
          />
          <Arc
            x={goalX}
            y={dir === 1 ? height - MARGIN : MARGIN}
            innerRadius={2 * avgScale}
            outerRadius={2 * avgScale}
            rotation={dir === 1 ? -90 : 90}
            angle={90}
            stroke={LINE_COLOR}
            strokeWidth={LINE_WIDTH}
          />
        </Group>
      ))}
    </Group>
  );
}

// x = pitch width axis (touchline to touchline), y = half-length axis.
// Halfway line sits at the top, goal line at the bottom.
function HalfPitchMarkings({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const playW = width - MARGIN * 2;
  const playH = height - MARGIN * 2;
  const scaleX = playW / 68;
  const scaleY = playH / 55;
  const avgScale = (scaleX + scaleY) / 2;
  const centerX = width / 2;
  const goalY = height - MARGIN;

  const boxDepth = 16.5 * scaleY;
  const boxHalfWidth = 20.16 * scaleX;
  const sixDepth = 5.5 * scaleY;
  const sixHalfWidth = 9.16 * scaleX;
  const spotOffset = 11 * scaleY;
  const arcRadius = 9.15 * avgScale;
  const goalHalfWidth = 3.66 * scaleX;
  const goalDepth = 2 * scaleY;
  const spotY = goalY - spotOffset;

  return (
    <Group>
      <Arc
        x={centerX}
        y={MARGIN}
        innerRadius={arcRadius}
        outerRadius={arcRadius}
        rotation={0}
        angle={180}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      <Rect
        x={centerX - boxHalfWidth}
        y={goalY - boxDepth}
        width={boxHalfWidth * 2}
        height={boxDepth}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      <Rect
        x={centerX - sixHalfWidth}
        y={goalY - sixDepth}
        width={sixHalfWidth * 2}
        height={sixDepth}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      <Circle x={centerX} y={spotY} radius={3} fill={LINE_COLOR} />
      <Arc
        x={centerX}
        y={spotY}
        innerRadius={arcRadius}
        outerRadius={arcRadius}
        rotation={217}
        angle={106}
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
      <Arc
        x={MARGIN}
        y={goalY}
        innerRadius={2 * avgScale}
        outerRadius={2 * avgScale}
        rotation={180}
        angle={90}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      <Arc
        x={width - MARGIN}
        y={goalY}
        innerRadius={2 * avgScale}
        outerRadius={2 * avgScale}
        rotation={90}
        angle={90}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
    </Group>
  );
}
