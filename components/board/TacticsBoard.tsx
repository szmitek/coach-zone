"use client";

import type Konva from "konva";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Circle, Layer, Line, Stage } from "react-konva";
import {
  createFullWidthLine,
  createPathElement,
  createPointElement,
  DOUBLE_TAP_DIST,
  DOUBLE_TAP_MS,
} from "@/lib/board/elements";
import {
  boardHistoryReducer,
  initialBoardHistoryState,
} from "@/lib/board/historyReducer";
import { distance, flattenPoints, translatePoints } from "@/lib/board/path";
import { getSportConfig } from "@/lib/board/sports/registry";
import type { PathToolStyle, ToolDef } from "@/lib/board/sports/types";
import {
  isPathElement,
  isPointElement,
  type ActiveTool,
  type BoardPoint,
} from "@/lib/board/types";
import type { Sport } from "@/lib/supabase/types";
import { BoardElementNode } from "./BoardElementNode";
import { BoardToolbar } from "./BoardToolbar";
import { PathDrawingControls } from "./PathDrawingControls";
import { PathElementNode } from "./PathElementNode";
import { SportSelector } from "./SportSelector";

type PendingAction =
  | { type: "clear" }
  | { type: "fieldMode"; modeId: string }
  | { type: "sport"; sportId: number };

interface DrawingPath {
  toolId: string;
  style: PathToolStyle;
  points: BoardPoint[];
}

function pickDefaultSportId(sports: Sport[]): number | null {
  const preferred = sports.find((s) => s.slug === "american_football");
  return preferred?.id ?? sports[0]?.id ?? null;
}

export function TacticsBoard({ sports }: { sports: Sport[] }) {
  const [history, dispatch] = useReducer(
    boardHistoryReducer,
    initialBoardHistoryState,
  );

  const [selectedSportId, setSelectedSportId] = useState<number | null>(() =>
    pickDefaultSportId(sports),
  );
  const activeSport = useMemo(
    () => sports.find((s) => s.id === selectedSportId) ?? null,
    [sports, selectedSportId],
  );
  const config = useMemo(
    () => getSportConfig(activeSport?.slug ?? null),
    [activeSport],
  );

  const [fieldModeId, setFieldModeId] = useState(config.defaultFieldModeId);
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedPointIndex, setSelectedPointIndex] = useState<number | null>(
    null,
  );
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(
    null,
  );
  const [drawingPath, setDrawingPath] = useState<DrawingPath | null>(null);
  const [previewCursor, setPreviewCursor] = useState<BoardPoint | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const lastTapRef = useRef<{ time: number; pos: BoardPoint } | null>(null);

  const fieldMode =
    config.fieldModes.find((m) => m.id === fieldModeId) ?? config.fieldModes[0];
  const dims = { width: fieldMode.width, height: fieldMode.height };
  const scale = containerSize.width > 0 ? containerSize.width / dims.width : 1;

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

  function cancelDrawingPath() {
    setDrawingPath(null);
    setPreviewCursor(null);
    lastTapRef.current = null;
  }

  function findTool(toolId: string): ToolDef | null {
    return config.tools.find((t) => t.id === toolId) ?? null;
  }

  function deleteSelected() {
    if (selectedPointIndex !== null && selectedId) {
      const el = history.present.find((item) => item.id === selectedId);
      if (el && isPathElement(el) && el.points.length > 2) {
        const nextPoints = el.points.filter((_, i) => i !== selectedPointIndex);
        dispatch({ type: "update", id: selectedId, patch: { points: nextPoints } });
        setSelectedPointIndex(null);
        return;
      }
    }
    if (selectedId) dispatch({ type: "delete", id: selectedId });
    setSelectedId(null);
    setSelectedPointIndex(null);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (pendingAction) {
        if (e.key === "Escape") setPendingAction(null);
        return;
      }
      if (drawingPath) {
        if (e.key === "Escape") cancelDrawingPath();
        return;
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        deleteSelected();
      } else if (e.key === "Escape") {
        setSelectedId(null);
        setSelectedPointIndex(null);
        setActiveTool("select");
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        dispatch({ type: e.shiftKey ? "redo" : "undo" });
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        dispatch({ type: "redo" });
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingAction, drawingPath, selectedId, selectedPointIndex, history.present]);

  function getPointer(): BoardPoint | null {
    return stageRef.current?.getRelativePointerPosition() ?? null;
  }

  function handleToolChange(toolId: string) {
    setActiveTool(toolId);
    cancelDrawingPath();
  }

  function handleSelectElement(id: string) {
    setSelectedId(id);
    setSelectedPointIndex(null);
  }

  function finishDrawingPath() {
    if (drawingPath && drawingPath.points.length >= 2) {
      const el = createPathElement(
        drawingPath.toolId,
        drawingPath.style,
        drawingPath.points,
      );
      dispatch({ type: "add", element: el });
      setSelectedId(el.id);
      setSelectedPointIndex(null);
    }
    cancelDrawingPath();
    setActiveTool("select");
  }

  function undoLastPathPoint() {
    setDrawingPath((current) => {
      if (!current) return current;
      if (current.points.length <= 1) return null;
      return { ...current, points: current.points.slice(0, -1) };
    });
  }

  function handlePathTap(tool: ToolDef, pos: BoardPoint) {
    if (tool.kind.create !== "path") return;
    const now = Date.now();

    if (drawingPath && drawingPath.toolId === tool.id) {
      const last = lastTapRef.current;
      const isDoubleTap =
        last !== null &&
        now - last.time < DOUBLE_TAP_MS &&
        distance(pos, last.pos) < DOUBLE_TAP_DIST;
      if (isDoubleTap) {
        finishDrawingPath();
        return;
      }
      setDrawingPath({ ...drawingPath, points: [...drawingPath.points, pos] });
      lastTapRef.current = { time: now, pos };
      return;
    }

    setDrawingPath({ toolId: tool.id, style: tool.kind.style, points: [pos] });
    lastTapRef.current = { time: now, pos };
  }

  function handleStageClick(
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent>,
  ) {
    if (e.target !== stageRef.current) return;
    if (activeTool === "select") {
      setSelectedId(null);
      setSelectedPointIndex(null);
      return;
    }
    const tool = findTool(activeTool);
    if (!tool) return;
    const pos = getPointer();
    if (!pos) return;

    if (tool.kind.create === "point") {
      const el = createPointElement(
        tool.kind.elementKind,
        pos.x,
        pos.y,
        tool.kind.defaultLabel ?? "",
      );
      dispatch({ type: "add", element: el });
      setSelectedId(el.id);
      setSelectedPointIndex(null);
      return;
    }
    if (tool.kind.create === "fullWidthLine") {
      const el = createFullWidthLine(tool.id, tool.kind.style, pos.y, dims.width);
      dispatch({ type: "add", element: el });
      setSelectedId(el.id);
      setSelectedPointIndex(null);
      return;
    }
    handlePathTap(tool, pos);
  }

  function handleStagePointerMove(
    e: Konva.KonvaEventObject<MouseEvent>,
  ) {
    if (!drawingPath) return;
    e.evt.preventDefault();
    const pos = getPointer();
    if (pos) setPreviewCursor(pos);
  }

  function handleElementDragEnd(id: string, pos: { x: number; y: number }) {
    dispatch({ type: "update", id, patch: { x: pos.x, y: pos.y } });
  }

  function handlePathTranslateEnd(id: string, dx: number, dy: number) {
    const el = history.present.find((item) => item.id === id);
    if (!el || !isPathElement(el)) return;
    dispatch({
      type: "update",
      id,
      patch: { points: translatePoints(el.points, dx, dy) },
    });
  }

  function handlePathPointDragEnd(
    id: string,
    index: number,
    pos: BoardPoint,
  ) {
    const el = history.present.find((item) => item.id === id);
    if (!el || !isPathElement(el)) return;
    const nextPoints = el.points.map((p, i) => (i === index ? pos : p));
    dispatch({ type: "update", id, patch: { points: nextPoints } });
  }

  function handlePathInsertPoint(
    id: string,
    afterIndex: number,
    point: BoardPoint,
  ) {
    const el = history.present.find((item) => item.id === id);
    if (!el || !isPathElement(el)) return;
    const nextPoints = [
      ...el.points.slice(0, afterIndex + 1),
      point,
      ...el.points.slice(afterIndex + 1),
    ];
    dispatch({ type: "update", id, patch: { points: nextPoints } });
  }

  function handleEditLabel(id: string) {
    const el = history.present.find((item) => item.id === id);
    if (!el || !isPointElement(el)) return;
    const next = window.prompt("Numer / etykieta zawodnika", el.label);
    if (next === null) return;
    dispatch({ type: "update", id, patch: { label: next.trim().slice(0, 3) } });
  }

  function handleFieldModeChange(modeId: string) {
    if (modeId === fieldModeId) return;
    if (history.present.length === 0) {
      setFieldModeId(modeId);
      return;
    }
    setPendingAction({ type: "fieldMode", modeId });
  }

  function applySportChange(sportId: number) {
    setSelectedSportId(sportId);
    const nextSport = sports.find((s) => s.id === sportId) ?? null;
    const nextConfig = getSportConfig(nextSport?.slug ?? null);
    setFieldModeId(nextConfig.defaultFieldModeId);
    setSelectedId(null);
    setSelectedPointIndex(null);
    setActiveTool("select");
    cancelDrawingPath();
  }

  function handleSportChange(sportId: number) {
    if (sportId === selectedSportId) return;
    if (history.present.length === 0) {
      applySportChange(sportId);
      return;
    }
    setPendingAction({ type: "sport", sportId });
  }

  function handleClearRequest() {
    if (history.present.length === 0) return;
    setPendingAction({ type: "clear" });
  }

  function confirmPendingAction() {
    if (!pendingAction) return;
    cancelDrawingPath();
    if (pendingAction.type === "fieldMode") {
      setFieldModeId(pendingAction.modeId);
    } else if (pendingAction.type === "sport") {
      applySportChange(pendingAction.sportId);
    }
    dispatch({ type: "clear" });
    setSelectedId(null);
    setSelectedPointIndex(null);
    setPendingAction(null);
  }

  // Frozen while a destructive action (clear / field / sport switch) awaits
  // confirmation, so nothing drawn in the meantime can be silently wiped
  // out by a stale "Tak".
  const frozenClassName = pendingAction
    ? "pointer-events-none opacity-60"
    : undefined;

  const drawingPreviewPoints =
    drawingPath && previewCursor
      ? [...drawingPath.points, previewCursor]
      : (drawingPath?.points ?? []);

  return (
    <div className="flex flex-col gap-3">
      <div className={frozenClassName}>
        <SportSelector
          sports={sports}
          selectedSportId={selectedSportId}
          onChange={handleSportChange}
        />
      </div>

      <div className={frozenClassName}>
        <BoardToolbar
          tools={config.tools}
          activeTool={activeTool}
          onToolChange={handleToolChange}
          fieldModes={config.fieldModes}
          fieldModeId={fieldMode.id}
          onFieldModeChange={handleFieldModeChange}
          canUndo={history.past.length > 0}
          canRedo={history.future.length > 0}
          onUndo={() => dispatch({ type: "undo" })}
          onRedo={() => dispatch({ type: "redo" })}
          onClear={handleClearRequest}
          hasSelection={selectedId !== null}
          deleteLabel={
            selectedPointIndex !== null
              ? "Usuń punkt trasy"
              : "Usuń zaznaczony element"
          }
          onDeleteSelected={deleteSelected}
        />
      </div>

      {pendingAction && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm dark:border-amber-900/50 dark:bg-amber-950/30">
          <span className="text-amber-800 dark:text-amber-300">
            {pendingAction.type === "clear"
              ? "Na pewno wyczyścić całą tablicę?"
              : pendingAction.type === "fieldMode"
                ? "Zmiana widoku boiska wyczyści obecny rysunek. Kontynuować?"
                : "Zmiana dyscypliny wyczyści obecny rysunek. Kontynuować?"}
          </span>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={confirmPendingAction}
              className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-500"
            >
              Tak
            </button>
            <button
              type="button"
              onClick={() => setPendingAction(null)}
              className="rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              Anuluj
            </button>
          </div>
        </div>
      )}

      {drawingPath && !pendingAction && (
        <PathDrawingControls
          pointCount={drawingPath.points.length}
          onFinish={finishDrawingPath}
          onUndoPoint={undoLastPathPoint}
          onCancel={() => {
            cancelDrawingPath();
            setActiveTool("select");
          }}
        />
      )}

      <div
        ref={containerRef}
        className={`w-full touch-none overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 ${frozenClassName ?? ""}`}
        style={{ aspectRatio: `${dims.width} / ${dims.height}` }}
      >
        {containerSize.width > 0 && (
          <Stage
            ref={stageRef}
            width={containerSize.width}
            height={containerSize.height}
            scaleX={scale}
            scaleY={scale}
            onClick={handleStageClick}
            onTap={handleStageClick}
            onMouseMove={handleStagePointerMove}
          >
            <config.FieldComponent
              modeId={fieldMode.id}
              width={dims.width}
              height={dims.height}
            />
            <Layer>
              {history.present.map((el) =>
                isPointElement(el) ? (
                  <BoardElementNode
                    key={el.id}
                    element={el}
                    selected={el.id === selectedId}
                    interactive={activeTool === "select"}
                    onSelect={handleSelectElement}
                    onDragEnd={handleElementDragEnd}
                    onEditLabel={handleEditLabel}
                  />
                ) : (
                  <PathElementNode
                    key={el.id}
                    element={el}
                    selected={el.id === selectedId}
                    interactive={activeTool === "select"}
                    selectedPointIndex={
                      el.id === selectedId ? selectedPointIndex : null
                    }
                    onSelect={handleSelectElement}
                    onSelectPoint={setSelectedPointIndex}
                    onTranslateEnd={handlePathTranslateEnd}
                    onPointDragEnd={handlePathPointDragEnd}
                    onInsertPoint={handlePathInsertPoint}
                  />
                ),
              )}
              {drawingPath && drawingPreviewPoints.length >= 2 && (
                <Line
                  points={flattenPoints(drawingPreviewPoints)}
                  tension={drawingPath.points.length > 2 ? 0.35 : 0}
                  stroke={drawingPath.style.color}
                  strokeWidth={drawingPath.style.strokeWidth}
                  dash={drawingPath.style.dash}
                  lineCap="round"
                  lineJoin="round"
                  opacity={0.85}
                  listening={false}
                />
              )}
              {drawingPath &&
                drawingPath.points.map((p, i) => (
                  <Circle
                    key={i}
                    x={p.x}
                    y={p.y}
                    radius={7}
                    fill="#10b981"
                    stroke="#ffffff"
                    strokeWidth={1.5}
                    listening={false}
                  />
                ))}
            </Layer>
          </Stage>
        )}
      </div>

      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        Wskazówka: dwukrotne dotknięcie zawodnika nadaje mu numer. Rysując
        trasę, stukaj kolejne punkty i zakończ dwukrotnym dotknięciem lub
        przyciskiem „Gotowe”. Zaznaczoną trasę przeciągasz jako całość albo
        za pojedyncze punkty, żeby ją przekształcić.
      </p>
    </div>
  );
}
