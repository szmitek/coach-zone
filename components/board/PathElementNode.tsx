"use client";

import type Konva from "konva";
import { Arrow, Circle, Group, Line } from "react-konva";
import {
  endTangent,
  flattenPoints,
  nearestPointOnPath,
  smoothPathPoints,
  wavyPathPoints,
} from "@/lib/board/path";
import type { BoardPoint, PathBoardElement } from "@/lib/board/types";

const HANDLE_RADIUS = 9;
const BLOCK_BAR_HALF_LENGTH = 11;

interface PathElementNodeProps {
  element: PathBoardElement;
  selected: boolean;
  interactive: boolean;
  selectedPointIndex: number | null;
  onSelect: (id: string) => void;
  onSelectPoint: (index: number) => void;
  onTranslateEnd: (id: string, dx: number, dy: number) => void;
  onPointDragEnd: (id: string, index: number, pos: BoardPoint) => void;
  onInsertPoint: (id: string, afterIndex: number, point: BoardPoint) => void;
}

export function PathElementNode({
  element,
  selected,
  interactive,
  selectedPointIndex,
  onSelect,
  onSelectPoint,
  onTranslateEnd,
  onPointDragEnd,
  onInsertPoint,
}: PathElementNodeProps) {
  const { points, color, strokeWidth, headStyle, dash, curved, wavy } =
    element;
  // Render points are pre-curved (centripetal Catmull-Rom) when smooth, so
  // Konva always draws with tension 0 - its own `tension` spline overshoots
  // past the tapped points for anything but perfectly even spacing.
  const curvedPoints =
    curved && points.length >= 2 ? smoothPathPoints(points) : points;
  const renderPoints = wavy ? wavyPathPoints(curvedPoints) : curvedPoints;
  const flat = flattenPoints(renderPoints);

  const select = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    e.cancelBubble = true;
    onSelect(element.id);
  };

  const handleBodyDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    const node = e.target;
    const dx = node.x();
    const dy = node.y();
    node.position({ x: 0, y: 0 });
    onTranslateEnd(element.id, dx, dy);
  };

  const insertPoint = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    e.cancelBubble = true;
    if (!selected || !interactive) return;
    const stage = e.target.getStage();
    const pos = stage?.getRelativePointerPosition();
    if (!pos) return;
    const nearest = nearestPointOnPath(points, pos);
    onInsertPoint(element.id, nearest.segmentIndex, nearest.point);
  };

  const highlight = selected
    ? { shadowColor: "black", shadowOpacity: 0.4, shadowBlur: 6 }
    : {};

  return (
    <Group
      // Skips hit-testing entirely while a placement/drawing tool is
      // active, so a tap near an existing path never swallows a tap meant
      // to place/draw something new - only "select" mode can interact
      // with elements already on the board.
      listening={interactive}
      draggable={interactive}
      onClick={select}
      onTap={select}
      onDragEnd={handleBodyDragEnd}
      onDblClick={insertPoint}
      onDblTap={insertPoint}
    >
      {headStyle === "arrow" ? (
        <Arrow
          points={flat}
          tension={0}
          stroke={color}
          fill={color}
          strokeWidth={strokeWidth}
          dash={dash}
          pointerLength={14}
          pointerWidth={14}
          hitStrokeWidth={28}
          lineCap="round"
          lineJoin="round"
          {...highlight}
        />
      ) : (
        <>
          <Line
            points={flat}
            tension={0}
            stroke={color}
            strokeWidth={strokeWidth}
            dash={dash}
            hitStrokeWidth={28}
            lineCap="round"
            lineJoin="round"
            {...highlight}
          />
          {headStyle === "bar" && (
            <BlockBar points={points} color={color} strokeWidth={strokeWidth} />
          )}
        </>
      )}
      {selected && interactive && (
        <>
          {points.map((p, i) => (
            <Circle
              key={i}
              x={p.x}
              y={p.y}
              radius={HANDLE_RADIUS}
              fill={i === selectedPointIndex ? "#fbbf24" : "#ffffff"}
              stroke="#111827"
              strokeWidth={1.5}
              draggable
              onClick={(e) => {
                e.cancelBubble = true;
                onSelectPoint(i);
              }}
              onTap={(e) => {
                e.cancelBubble = true;
                onSelectPoint(i);
              }}
              onDblClick={(e) => {
                e.cancelBubble = true;
              }}
              onDblTap={(e) => {
                e.cancelBubble = true;
              }}
              onDragMove={(e) => {
                e.cancelBubble = true;
              }}
              onDragEnd={(e) => {
                e.cancelBubble = true;
                onPointDragEnd(element.id, i, {
                  x: e.target.x(),
                  y: e.target.y(),
                });
              }}
            />
          ))}
        </>
      )}
    </Group>
  );
}

function BlockBar({
  points,
  color,
  strokeWidth,
}: {
  points: BoardPoint[];
  color: string;
  strokeWidth: number;
}) {
  const end = points[points.length - 1];
  const tangent = endTangent(points);
  const perp = { x: -tangent.y, y: tangent.x };
  const half = BLOCK_BAR_HALF_LENGTH;
  return (
    <Line
      points={[
        end.x - perp.x * half,
        end.y - perp.y * half,
        end.x + perp.x * half,
        end.y + perp.y * half,
      ]}
      stroke={color}
      strokeWidth={strokeWidth}
      lineCap="round"
    />
  );
}
