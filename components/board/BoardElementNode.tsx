"use client";

import type Konva from "konva";
import { Circle, Group, Line, RegularPolygon, Rect, Text } from "react-konva";
import { POINT_RADIUS } from "@/lib/board/elements";
import {
  LABELABLE_POINT_KINDS,
  type PointBoardElement,
  type PointElementType,
} from "@/lib/board/types";

const SELECTION_COLOR = "#fbbf24";

interface BoardElementNodeProps {
  element: PointBoardElement;
  selected: boolean;
  interactive: boolean;
  onSelect: (id: string) => void;
  onDragEnd: (id: string, pos: { x: number; y: number }) => void;
  onEditLabel: (id: string) => void;
}

export function BoardElementNode({
  element,
  selected,
  interactive,
  onSelect,
  onDragEnd,
  onEditLabel,
}: BoardElementNodeProps) {
  const select = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    e.cancelBubble = true;
    onSelect(element.id);
  };

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    onDragEnd(element.id, { x: e.target.x(), y: e.target.y() });
  };

  const canLabel = LABELABLE_POINT_KINDS.includes(element.kind);
  const editLabel = () => {
    if (canLabel) onEditLabel(element.id);
  };

  return (
    <Group
      id={element.id}
      x={element.x}
      y={element.y}
      // Skips hit-testing entirely while a placement tool is active, so
      // tapping near an existing element never swallows a tap meant to
      // place/draw something new - only "select" mode can interact with
      // elements already on the board.
      listening={interactive}
      draggable={interactive}
      onClick={select}
      onTap={select}
      onDragEnd={handleDragEnd}
      onDblClick={editLabel}
      onDblTap={editLabel}
    >
      {/* Enlarges the touch/click target well beyond the visible glyph -
          markers render small relative to the whole field, especially on
          phones, so a bigger hidden hit area keeps them tap/drag-able. */}
      <Circle radius={POINT_RADIUS * 2.2} fill="rgba(0,0,0,0.001)" />
      <PointGlyph kind={element.kind} selected={selected} />
      {element.label && (
        <Text
          text={element.label}
          fontSize={13}
          fontStyle="bold"
          fill="#ffffff"
          width={POINT_RADIUS * 2}
          height={POINT_RADIUS * 2}
          offsetX={POINT_RADIUS}
          offsetY={POINT_RADIUS}
          align="center"
          verticalAlign="middle"
          listening={false}
        />
      )}
    </Group>
  );
}

function PointGlyph({
  kind,
  selected,
}: {
  kind: PointElementType;
  selected: boolean;
}) {
  const stroke = selected ? SELECTION_COLOR : "#ffffff";
  const strokeWidth = selected ? 4 : 2;

  switch (kind) {
    case "player":
      return (
        <Circle
          radius={POINT_RADIUS}
          fill="#2563eb"
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      );
    case "opponent":
      return (
        <RegularPolygon
          sides={3}
          radius={POINT_RADIUS + 5}
          fill="#dc2626"
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      );
    case "qb":
      return (
        <Circle
          radius={POINT_RADIUS}
          fill="#f59e0b"
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      );
    case "ball":
      return (
        <Group>
          <Circle
            radius={POINT_RADIUS * 0.65}
            fill="#ffffff"
            stroke={selected ? SELECTION_COLOR : "#111827"}
            strokeWidth={selected ? 4 : 1.5}
          />
          <RegularPolygon sides={5} radius={POINT_RADIUS * 0.3} fill="#111827" />
        </Group>
      );
    case "cone":
      return (
        <RegularPolygon
          sides={3}
          radius={POINT_RADIUS * 0.9}
          fill="#f97316"
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      );
    case "partner": {
      // Same teal marker, but a dark outline (instead of the usual white
      // ring) so it doesn't wash out against light court surfaces.
      const partnerStroke = selected ? SELECTION_COLOR : "#111827";
      return (
        <Circle
          radius={POINT_RADIUS}
          fill="#0d9488"
          stroke={partnerStroke}
          strokeWidth={strokeWidth}
        />
      );
    }
    case "shield": {
      // Real contact shield colors: black fill, red outline - both read
      // clearly against grass and against orange/brown parquet alike.
      const r = POINT_RADIUS * 0.95;
      const shieldStroke = selected ? SELECTION_COLOR : "#dc2626";
      const shieldStrokeWidth = selected ? 4 : 3;
      return (
        <Group>
          <Line
            points={[
              -r, -r * 0.75,
              r, -r * 0.75,
              r, r * 0.15,
              0, r * 1.05,
              -r, r * 0.15,
            ]}
            closed
            fill="#111827"
            stroke={shieldStroke}
            strokeWidth={shieldStrokeWidth}
            lineJoin="round"
          />
          <Line
            points={[0, -r * 0.55, 0, r * 0.55]}
            stroke="#f8fafc"
            strokeWidth={1.5}
            opacity={0.7}
            listening={false}
          />
        </Group>
      );
    }
    case "gate": {
      // PVC training gate: white frame/posts with a dark outline so the
      // white doesn't disappear against light court surfaces.
      const w = POINT_RADIUS * 1.7;
      const h = POINT_RADIUS * 1.15;
      const gateStroke = selected ? SELECTION_COLOR : "#111827";
      const gateStrokeWidth = selected ? 4 : 3;
      return (
        <Group>
          <Rect
            x={-w / 2}
            y={-h / 2}
            width={w}
            height={h}
            cornerRadius={4}
            fill="rgba(248, 250, 252, 0.35)"
            stroke={gateStroke}
            strokeWidth={gateStrokeWidth}
          />
          <Circle x={-w / 2} y={h / 2} radius={3.5} fill="#f8fafc" stroke="#111827" strokeWidth={1.5} />
          <Circle x={w / 2} y={h / 2} radius={3.5} fill="#f8fafc" stroke="#111827" strokeWidth={1.5} />
        </Group>
      );
    }
  }
}
