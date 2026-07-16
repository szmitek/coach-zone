"use client";

import { useEffect, useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import { getSportConfig } from "@/lib/board/sports/registry";
import type { ShowcaseScene } from "@/lib/board/showcase/types";
import { AnimatedPath } from "./AnimatedPath";
import { AnimatedPoint } from "./AnimatedPoint";

/**
 * Renders one scripted scene at a given point in time, using the exact same
 * engine as the real tactics board: react-konva Stage/Layer, the real
 * per-sport FieldComponent, and the real field dimensions/scaling approach
 * (a ResizeObserver-driven scale, same as TacticsBoard.tsx) - so what's on
 * screen here is pixel-identical to the board the coach edits next.
 */
export function BoardShowcaseScene({
  scene,
  elapsed,
}: {
  scene: ShowcaseScene;
  elapsed: number;
}) {
  const config = getSportConfig(scene.sportSlug);
  const fieldMode =
    config.fieldModes.find((m) => m.id === scene.fieldModeId) ?? config.fieldModes[0];
  const dims = { width: fieldMode.width, height: fieldMode.height };

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setContainerSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scale = containerSize.width > 0 ? containerSize.width / dims.width : 1;

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-hidden rounded-2xl sm:rounded-3xl"
      style={{ aspectRatio: `${dims.width} / ${dims.height}` }}
    >
      {containerSize.width > 0 && (
        <Stage width={containerSize.width} height={containerSize.height} scaleX={scale} scaleY={scale}>
          <config.FieldComponent modeId={fieldMode.id} width={dims.width} height={dims.height} />
          <Layer listening={false}>
            {scene.markers.map((m) => (
              <AnimatedPoint key={m.id} marker={m} elapsed={elapsed} />
            ))}
            {scene.paths.map((p) => (
              <AnimatedPath key={p.id} path={p} elapsed={elapsed} />
            ))}
          </Layer>
        </Stage>
      )}
    </div>
  );
}
