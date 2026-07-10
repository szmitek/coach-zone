"use client";

import type Konva from "konva";
import { Arrow, Circle, Group, RegularPolygon, Text } from "react-konva";
import { isLineElement, type BoardElement, type PointElementType } from "@/lib/board/types";
import { POINT_RADIUS } from "@/lib/board/elements";

const SELECTION_COLOR = "#fbbf24";

interface BoardElementNodeProps {
  element: BoardElement;
  selected: boolean;
  interactive: boolean;
  onSelect: (id: string) => void;
  onDragEnd: (id: string, pos: { x: number; y: number }) => void;
  onRegisterNode: (id: string, node: Konva.Node | null) => void;
  onEditLabel: (id: string) => void;
}

export function BoardElementNode({
  element,
  selected,
  interactive,
  onSelect,
  onDragEnd,
  onRegisterNode,
  onEditLabel,
}: BoardElementNodeProps) {
  const select = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    e.cancelBubble = true;
    onSelect(element.id);
  };

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    onDragEnd(element.id, { x: e.target.x(), y: e.target.y() });
  };

  if (isLineElement(element)) {
    const isPassLine = element.type === "passLine";
    const color = isPassLine ? "#7c3aed" : "#111827";
    return (
      <Arrow
        ref={(node) => onRegisterNode(element.id, node)}
        id={element.id}
        x={element.x}
        y={element.y}
        rotation={element.rotation}
        points={[0, 0, element.endX, element.endY]}
        stroke={color}
        fill={color}
        strokeWidth={4}
        dash={isPassLine ? [14, 10] : undefined}
        pointerLength={14}
        pointerWidth={14}
        hitStrokeWidth={28}
        draggable={interactive}
        onClick={select}
        onTap={select}
        onDragEnd={handleDragEnd}
        shadowColor="black"
        shadowOpacity={selected ? 0.4 : 0}
        shadowBlur={selected ? 6 : 0}
      />
    );
  }

  const canLabel = element.type === "player" || element.type === "opponent";
  const editLabel = () => {
    if (canLabel) onEditLabel(element.id);
  };

  return (
    <Group
      ref={(node) => onRegisterNode(element.id, node)}
      id={element.id}
      x={element.x}
      y={element.y}
      rotation={element.rotation}
      draggable={interactive}
      onClick={select}
      onTap={select}
      onDragEnd={handleDragEnd}
      onDblClick={editLabel}
      onDblTap={editLabel}
    >
      {/* Enlarges the touch/click target well beyond the visible glyph -
          markers render small relative to the whole pitch, especially on
          phones, so a bigger hidden hit area keeps them tap/drag-able. */}
      <Circle radius={POINT_RADIUS * 2.2} fill="rgba(0,0,0,0.001)" />
      <PointGlyph type={element.type} selected={selected} />
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
  type,
  selected,
}: {
  type: PointElementType;
  selected: boolean;
}) {
  const stroke = selected ? SELECTION_COLOR : "#ffffff";
  const strokeWidth = selected ? 4 : 2;

  switch (type) {
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
  }
}
