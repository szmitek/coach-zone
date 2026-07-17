"use client";

import type Konva from "konva";
import { Arrow, Circle, Group, Line } from "react-konva";
import {
  endTangent,
  flattenPoints,
  markPointsAlongPolyline,
  nearestPointOnPath,
  smoothPathPoints,
  wavyPathPoints,
} from "@/lib/board/path";
import type { BoardPoint, PathBoardElement } from "@/lib/board/types";

const HANDLE_RADIUS = 9;
const BLOCK_BAR_HALF_LENGTH = 11;
const LADDER_RUNG_SPACING = 20;
const LADDER_RAIL_GAP = 24;
const LADDER_RUNG_OVERHANG = 5;
const HURDLE_SPACING = 42;
const HURDLE_BAR_HALF_WIDTH = 11;
const HURDLE_LEG_LENGTH = 7;

// Equipment renders in real-world equipment colors rather than the tool's
// UI-accent `color`, and always as a dark outline plus a distinct fill/line
// color - a single hue can't stay legible on both green grass and the
// orange/brown basketball parquet, but outline + color together do.
const EQUIPMENT_OUTLINE_COLOR = "#111827";
const LADDER_RAIL_COLOR = "#dc2626";
const LADDER_RUNG_COLOR = "#facc15";
const HURDLE_COLOR = "#dc2626";

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
      {element.kind === "ladder" ? (
        <LadderShape
          points={points}
          strokeWidth={strokeWidth}
          highlight={highlight}
        />
      ) : element.kind === "hurdles" ? (
        <HurdleRow
          points={points}
          strokeWidth={strokeWidth}
          highlight={highlight}
        />
      ) : headStyle === "arrow" ? (
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

type ShadowHighlight = {
  shadowColor?: string;
  shadowOpacity?: number;
  shadowBlur?: number;
};

/**
 * Agility ladder: two parallel rails the full length of the element, with
 * perpendicular rungs at even spacing between them. Marks are re-derived
 * from `points` on every render, so dragging either endpoint (the generic
 * path point-handles above) stretches/rotates the whole ladder for free.
 */
function LadderShape({
  points,
  strokeWidth,
  highlight,
}: {
  points: BoardPoint[];
  strokeWidth: number;
  highlight: ShadowHighlight;
}) {
  const marks = markPointsAlongPolyline(points, LADDER_RUNG_SPACING);
  const half = LADDER_RAIL_GAP / 2;
  const railSide = (side: 1 | -1) =>
    flattenPoints(
      marks.map((m) => {
        const perp = { x: -m.dir.y, y: m.dir.x };
        return {
          x: m.point.x + perp.x * half * side,
          y: m.point.y + perp.y * half * side,
        };
      }),
    );
  const rail1 = railSide(1);
  const railNeg1 = railSide(-1);
  const rungStrokeWidth = Math.max(2, strokeWidth - 1);

  return (
    <Group {...highlight}>
      <Line
        points={rail1}
        stroke={EQUIPMENT_OUTLINE_COLOR}
        strokeWidth={strokeWidth + 2.5}
        lineCap="round"
        lineJoin="round"
      />
      <Line
        points={rail1}
        stroke={LADDER_RAIL_COLOR}
        strokeWidth={strokeWidth}
        lineCap="round"
        lineJoin="round"
        listening={false}
      />
      <Line
        points={railNeg1}
        stroke={EQUIPMENT_OUTLINE_COLOR}
        strokeWidth={strokeWidth + 2.5}
        lineCap="round"
        lineJoin="round"
      />
      <Line
        points={railNeg1}
        stroke={LADDER_RAIL_COLOR}
        strokeWidth={strokeWidth}
        lineCap="round"
        lineJoin="round"
        listening={false}
      />
      {marks.map((m, i) => {
        const perp = { x: -m.dir.y, y: m.dir.x };
        const rungHalf = half + LADDER_RUNG_OVERHANG;
        const rungPoints = [
          m.point.x - perp.x * rungHalf,
          m.point.y - perp.y * rungHalf,
          m.point.x + perp.x * rungHalf,
          m.point.y + perp.y * rungHalf,
        ];
        return (
          <Group key={i}>
            <Line
              points={rungPoints}
              stroke={EQUIPMENT_OUTLINE_COLOR}
              strokeWidth={rungStrokeWidth + 2}
              lineCap="round"
              hitStrokeWidth={20}
            />
            <Line
              points={rungPoints}
              stroke={LADDER_RUNG_COLOR}
              strokeWidth={rungStrokeWidth}
              lineCap="round"
              listening={false}
            />
          </Group>
        );
      })}
    </Group>
  );
}

/**
 * A row of hurdles: small "H"-shaped marks (crossbar + two legs pointing
 * along the direction of travel) at even spacing along `points`. Same
 * stretch-by-endpoint model as the ladder above.
 */
function HurdleRow({
  points,
  strokeWidth,
  highlight,
}: {
  points: BoardPoint[];
  strokeWidth: number;
  highlight: ShadowHighlight;
}) {
  const marks = markPointsAlongPolyline(points, HURDLE_SPACING);
  const outlineWidth = strokeWidth + 2.5;

  return (
    <Group {...highlight}>
      {marks.map((m, i) => {
        const perp = { x: -m.dir.y, y: m.dir.x };
        const barA = {
          x: m.point.x - perp.x * HURDLE_BAR_HALF_WIDTH,
          y: m.point.y - perp.y * HURDLE_BAR_HALF_WIDTH,
        };
        const barB = {
          x: m.point.x + perp.x * HURDLE_BAR_HALF_WIDTH,
          y: m.point.y + perp.y * HURDLE_BAR_HALF_WIDTH,
        };
        const legA = {
          x: barA.x + m.dir.x * HURDLE_LEG_LENGTH,
          y: barA.y + m.dir.y * HURDLE_LEG_LENGTH,
        };
        const legB = {
          x: barB.x + m.dir.x * HURDLE_LEG_LENGTH,
          y: barB.y + m.dir.y * HURDLE_LEG_LENGTH,
        };
        const barPoints = [barA.x, barA.y, barB.x, barB.y];
        const legAPoints = [barA.x, barA.y, legA.x, legA.y];
        const legBPoints = [barB.x, barB.y, legB.x, legB.y];
        return (
          <Group key={i}>
            <Line
              points={barPoints}
              stroke={EQUIPMENT_OUTLINE_COLOR}
              strokeWidth={outlineWidth}
              lineCap="round"
              hitStrokeWidth={20}
            />
            <Line
              points={legAPoints}
              stroke={EQUIPMENT_OUTLINE_COLOR}
              strokeWidth={outlineWidth}
              lineCap="round"
            />
            <Line
              points={legBPoints}
              stroke={EQUIPMENT_OUTLINE_COLOR}
              strokeWidth={outlineWidth}
              lineCap="round"
            />
            <Line
              points={barPoints}
              stroke={HURDLE_COLOR}
              strokeWidth={strokeWidth}
              lineCap="round"
              listening={false}
            />
            <Line
              points={legAPoints}
              stroke={HURDLE_COLOR}
              strokeWidth={strokeWidth}
              lineCap="round"
              listening={false}
            />
            <Line
              points={legBPoints}
              stroke={HURDLE_COLOR}
              strokeWidth={strokeWidth}
              lineCap="round"
              listening={false}
            />
          </Group>
        );
      })}
    </Group>
  );
}
