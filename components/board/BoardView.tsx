"use client";

import { useEffect, useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import { getSportConfig } from "@/lib/board/sports/registry";
import { isPathElement, isPointElement, type BoardElement } from "@/lib/board/types";
import { BoardElementNode } from "./BoardElementNode";
import { PathElementNode } from "./PathElementNode";

const noop = () => {};

interface BoardViewProps {
  sportSlug?: string | null;
  /** Exercise's stored board_field_mode - null falls back to the sport's defaultFieldModeId, same as a brand-new board. */
  fieldModeId?: string | null;
  elements: BoardElement[];
}

/**
 * Read-only rendering of a saved board_state diagram, reusing the exact
 * same field + element components as the editable TacticsBoard (minus
 * every interactive handler), so an exercise's diagram renders
 * pixel-identical on the detail page without loading the full editor.
 */
export function BoardView({ sportSlug, fieldModeId, elements }: BoardViewProps) {
  const config = getSportConfig(sportSlug);
  const resolvedModeId = fieldModeId ?? config.defaultFieldModeId;
  const fieldMode =
    config.fieldModes.find((m) => m.id === resolvedModeId) ??
    config.fieldModes[0];
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
      className="w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950"
      style={{ aspectRatio: `${dims.width} / ${dims.height}` }}
    >
      {containerSize.width > 0 && (
        <Stage
          width={containerSize.width}
          height={containerSize.height}
          scaleX={scale}
          scaleY={scale}
          listening={false}
        >
          <config.FieldComponent
            modeId={fieldMode.id}
            width={dims.width}
            height={dims.height}
          />
          <Layer listening={false}>
            {elements.map((el) =>
              isPointElement(el) ? (
                <BoardElementNode
                  key={el.id}
                  element={el}
                  selected={false}
                  interactive={false}
                  onSelect={noop}
                  onDragEnd={noop}
                  onEditLabel={noop}
                />
              ) : isPathElement(el) ? (
                <PathElementNode
                  key={el.id}
                  element={el}
                  selected={false}
                  interactive={false}
                  selectedPointIndex={null}
                  onSelect={noop}
                  onSelectPoint={noop}
                  onTranslateEnd={noop}
                  onPointDragEnd={noop}
                  onInsertPoint={noop}
                />
              ) : null,
            )}
          </Layer>
        </Stage>
      )}
    </div>
  );
}
