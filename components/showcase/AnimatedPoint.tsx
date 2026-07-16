"use client";

import { Group } from "react-konva";
import { BoardElementNode } from "@/components/board/BoardElementNode";
import { easeOutCubic, timedProgress } from "@/lib/board/showcase/easing";
import type { ShowcaseMarker } from "@/lib/board/showcase/types";

const FADE_DURATION = 450;
const noop = () => {};

/**
 * Fades and settles a real board marker (same BoardElementNode used by the
 * live editor - same glyphs, same colors) into place at `marker.appearAt`.
 * Scales in from 0.7x to 1x around the marker's own position, not the
 * stage origin, so it reads as a calm "settle" rather than a pop.
 */
export function AnimatedPoint({
  marker,
  elapsed,
}: {
  marker: ShowcaseMarker;
  elapsed: number;
}) {
  const progress = timedProgress(elapsed, marker.appearAt, FADE_DURATION, easeOutCubic);
  if (progress <= 0) return null;

  const scale = 0.7 + progress * 0.3;

  return (
    <Group x={marker.x} y={marker.y} opacity={progress} scaleX={scale} scaleY={scale}>
      <BoardElementNode
        element={{
          id: marker.id,
          type: "point",
          kind: marker.kind,
          x: 0,
          y: 0,
          label: marker.label ?? "",
        }}
        selected={false}
        interactive={false}
        onSelect={noop}
        onDragEnd={noop}
        onEditLabel={noop}
      />
    </Group>
  );
}
