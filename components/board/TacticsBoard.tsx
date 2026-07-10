"use client";

import type Konva from "konva";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { Arrow, Layer, Stage, Transformer } from "react-konva";
import {
  createLineElementFromDrag,
  createPointElement,
  isLineElementType,
  MIN_LINE_LENGTH,
} from "@/lib/board/elements";
import {
  boardHistoryReducer,
  initialBoardHistoryState,
} from "@/lib/board/historyReducer";
import { PITCH_DIMENSIONS } from "@/lib/board/pitch";
import {
  isLineElement,
  type ActiveTool,
  type LineElementType,
  type PitchMode,
} from "@/lib/board/types";
import { BoardElementNode } from "./BoardElementNode";
import { BoardToolbar } from "./BoardToolbar";
import { PitchBackground } from "./PitchBackground";

type PendingAction = { type: "clear" } | { type: "pitch"; mode: PitchMode };

interface DrawingLine {
  type: LineElementType;
  start: { x: number; y: number };
  end: { x: number; y: number };
}

export function TacticsBoard() {
  const [history, dispatch] = useReducer(
    boardHistoryReducer,
    initialBoardHistoryState,
  );
  const [pitchMode, setPitchMode] = useState<PitchMode>("full");
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(
    null,
  );
  const [drawingLine, setDrawingLine] = useState<DrawingLine | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const nodesRef = useRef(new Map<string, Konva.Node>());

  const dims = PITCH_DIMENSIONS[pitchMode];
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

  const registerNode = useCallback((id: string, node: Konva.Node | null) => {
    if (node) nodesRef.current.set(id, node);
    else nodesRef.current.delete(id);
  }, []);

  useEffect(() => {
    const tr = transformerRef.current;
    if (!tr) return;
    const el = history.present.find((item) => item.id === selectedId);
    if (el && isLineElement(el)) {
      const node = nodesRef.current.get(el.id);
      tr.nodes(node ? [node] : []);
    } else {
      tr.nodes([]);
    }
    tr.getLayer()?.batchDraw();
  }, [selectedId, history.present]);

  const handleDeleteSelected = useCallback(() => {
    setSelectedId((current) => {
      if (current) dispatch({ type: "delete", id: current });
      return null;
    });
  }, []);

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
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        handleDeleteSelected();
      } else if (e.key === "Escape") {
        setSelectedId(null);
        setActiveTool("select");
        setDrawingLine(null);
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
  }, [handleDeleteSelected, pendingAction]);

  function getPointer() {
    return stageRef.current?.getRelativePointerPosition() ?? null;
  }

  function handleToolChange(tool: ActiveTool) {
    setActiveTool(tool);
    setDrawingLine(null);
  }

  function handleStageClick(
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent>,
  ) {
    if (e.target !== stageRef.current) return;
    if (activeTool === "select") {
      setSelectedId(null);
      return;
    }
    if (isLineElementType(activeTool)) return;
    const pos = getPointer();
    if (!pos) return;
    const el = createPointElement(activeTool, pos.x, pos.y);
    dispatch({ type: "add", element: el });
    setSelectedId(el.id);
  }

  function handleStagePointerDown(
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent>,
  ) {
    if (activeTool === "select" || !isLineElementType(activeTool)) return;
    if (e.target !== stageRef.current) return;
    const pos = getPointer();
    if (!pos) return;
    setDrawingLine({ type: activeTool, start: pos, end: pos });
  }

  function handleStagePointerMove(
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent>,
  ) {
    if (!drawingLine) return;
    e.evt.preventDefault();
    const pos = getPointer();
    if (!pos) return;
    setDrawingLine((current) => (current ? { ...current, end: pos } : current));
  }

  function handleStagePointerUp() {
    if (!drawingLine) return;
    const el = createLineElementFromDrag(
      drawingLine.type,
      drawingLine.start,
      drawingLine.end,
    );
    dispatch({ type: "add", element: el });
    setSelectedId(el.id);
    setDrawingLine(null);
    setActiveTool("select");
  }

  function handleElementDragEnd(id: string, pos: { x: number; y: number }) {
    dispatch({ type: "update", id, patch: { x: pos.x, y: pos.y } });
  }

  function handleTransformEnd() {
    const node = transformerRef.current?.nodes()[0];
    if (!node || !selectedId) return;
    const scaleX = node.scaleX();
    node.scaleX(1);
    node.scaleY(1);
    const el = history.present.find((item) => item.id === selectedId);
    if (!el || !isLineElement(el)) return;
    const newLength = Math.max(el.endX * scaleX, MIN_LINE_LENGTH);
    dispatch({
      type: "update",
      id: selectedId,
      patch: {
        x: node.x(),
        y: node.y(),
        rotation: node.rotation(),
        endX: newLength,
        endY: 0,
      },
    });
  }

  function handleEditLabel(id: string) {
    const el = history.present.find((item) => item.id === id);
    if (!el || isLineElement(el)) return;
    const next = window.prompt("Numer / etykieta zawodnika", el.label);
    if (next === null) return;
    dispatch({ type: "update", id, patch: { label: next.trim().slice(0, 3) } });
  }

  function handlePitchModeChange(mode: PitchMode) {
    if (mode === pitchMode) return;
    if (history.present.length === 0) {
      setPitchMode(mode);
      return;
    }
    setPendingAction({ type: "pitch", mode });
  }

  function handleClearRequest() {
    if (history.present.length === 0) return;
    setPendingAction({ type: "clear" });
  }

  function confirmPendingAction() {
    if (!pendingAction) return;
    if (pendingAction.type === "pitch") setPitchMode(pendingAction.mode);
    dispatch({ type: "clear" });
    setSelectedId(null);
    setPendingAction(null);
  }

  // Frozen while a destructive action (clear / pitch switch) awaits
  // confirmation, so nothing drawn in the meantime can be silently wiped
  // out by a stale "Tak".
  const frozenClassName = pendingAction
    ? "pointer-events-none opacity-60"
    : undefined;

  return (
    <div className="flex flex-col gap-3">
      <div className={frozenClassName}>
        <BoardToolbar
          activeTool={activeTool}
          onToolChange={handleToolChange}
          pitchMode={pitchMode}
          onPitchModeChange={handlePitchModeChange}
          canUndo={history.past.length > 0}
          canRedo={history.future.length > 0}
          onUndo={() => dispatch({ type: "undo" })}
          onRedo={() => dispatch({ type: "redo" })}
          onClear={handleClearRequest}
          hasSelection={selectedId !== null}
          onDeleteSelected={handleDeleteSelected}
        />
      </div>

      {pendingAction && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm dark:border-amber-900/50 dark:bg-amber-950/30">
          <span className="text-amber-800 dark:text-amber-300">
            {pendingAction.type === "clear"
              ? "Na pewno wyczyścić całą tablicę?"
              : "Zmiana boiska wyczyści obecny rysunek. Kontynuować?"}
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
            onMouseDown={handleStagePointerDown}
            onTouchStart={handleStagePointerDown}
            onMouseMove={handleStagePointerMove}
            onTouchMove={handleStagePointerMove}
            onMouseUp={handleStagePointerUp}
            onTouchEnd={handleStagePointerUp}
          >
            <PitchBackground
              mode={pitchMode}
              width={dims.width}
              height={dims.height}
            />
            <Layer>
              {history.present.map((el) => (
                <BoardElementNode
                  key={el.id}
                  element={el}
                  selected={el.id === selectedId}
                  interactive={activeTool === "select"}
                  onSelect={setSelectedId}
                  onDragEnd={handleElementDragEnd}
                  onRegisterNode={registerNode}
                  onEditLabel={handleEditLabel}
                />
              ))}
              {drawingLine && (
                <Arrow
                  points={[
                    drawingLine.start.x,
                    drawingLine.start.y,
                    drawingLine.end.x,
                    drawingLine.end.y,
                  ]}
                  stroke={drawingLine.type === "passLine" ? "#7c3aed" : "#111827"}
                  fill={drawingLine.type === "passLine" ? "#7c3aed" : "#111827"}
                  dash={drawingLine.type === "passLine" ? [14, 10] : undefined}
                  strokeWidth={4}
                  pointerLength={14}
                  pointerWidth={14}
                  listening={false}
                  opacity={0.85}
                />
              )}
              <Transformer
                ref={transformerRef}
                rotateEnabled
                enabledAnchors={["middle-left", "middle-right"]}
                anchorSize={24}
                anchorCornerRadius={12}
                rotateAnchorOffset={36}
                borderStroke="#fbbf24"
                anchorStroke="#fbbf24"
                anchorFill="#ffffff"
                onTransformEnd={handleTransformEnd}
              />
            </Layer>
          </Stage>
        )}
      </div>

      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        Wskazówka: dwukrotne dotknięcie zawodnika lub przeciwnika nadaje mu
        numer. Zaznaczoną strzałkę obracasz i skracasz uchwytami na jej
        końcach.
      </p>
    </div>
  );
}
