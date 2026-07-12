"use client";

import { Group, Layer, Line, Rect } from "react-konva";
import type { FieldRendererProps } from "@/lib/board/sports/types";

// Wider than the other fields' 24px - a volleyball court is always shown
// whole (no half-court mode), so the margin doubles as room to draw the
// service zone markers and net posts just outside the court boundary
// without them running off the canvas.
const MARGIN = 48;
const LINE_COLOR = "#f8fafc";
const LINE_WIDTH = 3;
const FLOOR_DARK = "#b45309";
const FLOOR_LIGHT = "#c2670f";

// 18m x 9m FIVB court - FULL_WIDTH/FULL_HEIGHT below are chosen so
// scaleX derived from this matches the vertical scale implied by the
// canvas dimensions exactly (no separate scaleY needed).
const COURT_LENGTH = 18;
const ATTACK_LINE_DEPTH = 3;
const NET_POST_LENGTH = 16;
const SERVICE_ZONE_MARK = 18;

export function VolleyballField({ width, height }: FieldRendererProps) {
  const playW = width - MARGIN * 2;
  const playH = height - MARGIN * 2;
  const scaleX = playW / COURT_LENGTH;
  const centerX = width / 2;
  const attackOffset = ATTACK_LINE_DEPTH * scaleX;

  return (
    <Layer listening={false}>
      <Rect x={0} y={0} width={width} height={height} fill={FLOOR_DARK} />
      <Rect
        x={MARGIN}
        y={MARGIN}
        width={playW}
        height={playH}
        fill={FLOOR_LIGHT}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />

      {/* Centre line, directly under the net. */}
      <Line
        points={[centerX, MARGIN, centerX, height - MARGIN]}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      {/* Net posts, just outside the sidelines on the centre line's axis. */}
      <Line
        points={[centerX, MARGIN - NET_POST_LENGTH, centerX, MARGIN]}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />
      <Line
        points={[
          centerX,
          height - MARGIN,
          centerX,
          height - MARGIN + NET_POST_LENGTH,
        ]}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH}
      />

      {/* Attack (3m) lines on both sides of the net. */}
      <Line
        points={[
          centerX - attackOffset,
          MARGIN,
          centerX - attackOffset,
          height - MARGIN,
        ]}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH * 0.7}
      />
      <Line
        points={[
          centerX + attackOffset,
          MARGIN,
          centerX + attackOffset,
          height - MARGIN,
        ]}
        stroke={LINE_COLOR}
        strokeWidth={LINE_WIDTH * 0.7}
      />

      {/* Service zones: sideline continuations just behind each end line. */}
      {[MARGIN, width - MARGIN].map((x) => (
        <Group key={x}>
          <Line
            points={[
              x,
              MARGIN,
              x + (x === MARGIN ? -SERVICE_ZONE_MARK : SERVICE_ZONE_MARK),
              MARGIN,
            ]}
            stroke={LINE_COLOR}
            strokeWidth={LINE_WIDTH * 0.7}
          />
          <Line
            points={[
              x,
              height - MARGIN,
              x + (x === MARGIN ? -SERVICE_ZONE_MARK : SERVICE_ZONE_MARK),
              height - MARGIN,
            ]}
            stroke={LINE_COLOR}
            strokeWidth={LINE_WIDTH * 0.7}
          />
        </Group>
      ))}
    </Layer>
  );
}
