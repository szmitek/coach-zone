"use client";

import { Layer, Rect } from "react-konva";
import type { FieldRendererProps } from "@/lib/board/sports/types";

const MARGIN = 24;
const LINE_COLOR = "#f8fafc";
const LINE_WIDTH = 3;
const FLOOR_COLOR = "#3f6212";

// Plain placeholder surface for any sport without a dedicated field yet
// (basketball/volleyball/handball this round) - degrades gracefully
// instead of guessing at a court it hasn't been built for.
export function GenericField({ width, height }: FieldRendererProps) {
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
    </Layer>
  );
}
