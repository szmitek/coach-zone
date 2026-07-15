"use client";

import type Konva from "konva";
import {
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import { Circle, Layer, Line, Stage } from "react-konva";
import {
  createFullWidthLine,
  createPathElement,
  createPointElement,
} from "@/lib/board/elements";
import {
  boardHistoryReducer,
  type BoardHistoryState,
} from "@/lib/board/historyReducer";
import {
  flattenPoints,
  smoothPathPoints,
  translatePoints,
  wavyPathPoints,
} from "@/lib/board/path";
import {
  isDoubleTapToFinish,
  isDuplicateStageEvent,
  type LastStageEvent,
} from "@/lib/board/tapGuard";
import { getSportConfig } from "@/lib/board/sports/registry";
import type { PathToolStyle, ToolDef } from "@/lib/board/sports/types";
import {
  isPathElement,
  isPointElement,
  type ActiveTool,
  type BoardElement,
  type BoardPoint,
} from "@/lib/board/types";
import type { Sport } from "@/lib/supabase/types";
import { BoardElementNode } from "./BoardElementNode";
import { BoardToolbar } from "./BoardToolbar";
import { PathDrawingControls } from "./PathDrawingControls";
import { PathElementNode } from "./PathElementNode";

type PendingAction = { type: "clear" } | { type: "fieldMode"; modeId: string };

interface DrawingPath {
  toolId: string;
  style: PathToolStyle;
  points: BoardPoint[];
  curved: boolean;
}

function pickDefaultSportId(sports: Sport[]): number | null {
  const preferred = sports.find((s) => s.slug === "american_football");
  return preferred?.id ?? sports[0]?.id ?? null;
}

function initHistory(elements: BoardElement[]): BoardHistoryState {
  return { past: [], present: elements, future: [] };
}

// PNG exports are capped to this width (px) regardless of how large the
// on-screen canvas is, so a diagram drawn on a wide desktop monitor doesn't
// upload a needlessly large file - keeps Supabase Storage's free tier cheap.
const EXPORT_TARGET_WIDTH = 900;

export interface TacticsBoardHandle {
  isEmpty(): boolean;
  getElements(): BoardElement[];
  /** Data URL (PNG) of the current drawing, or null if the board is empty. */
  exportPng(): string | null;
}

interface TacticsBoardProps {
  sports: Sport[];
  /** Controlled from outside (the exercise's "Dyscyplina" field) - null before a sport is chosen. */
  sportId?: number | null;
  initialElements?: BoardElement[];
  /** Mutated (not replaced) with the latest imperative handle on every relevant change. */
  handleRef?: MutableRefObject<TacticsBoardHandle | null>;
}

export function TacticsBoard({
  sports,
  sportId = null,
  initialElements,
  handleRef,
}: TacticsBoardProps) {
  const [history, dispatch] = useReducer(
    boardHistoryReducer,
    initialElements ?? [],
    initHistory,
  );

  const [selectedSportId, setSelectedSportId] = useState<number | null>(
    () => sportId ?? pickDefaultSportId(sports),
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
  const [curveMode, setCurveMode] = useState<"sharp" | "smooth">("sharp");
  const [previewCursor, setPreviewCursor] = useState<BoardPoint | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [sportSwitchNotice, setSportSwitchNotice] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const lastTapRef = useRef<{ time: number; pos: BoardPoint } | null>(null);
  // Mobile browsers can deliver more than one Konva event ("tap" and
  // "click") for a single physical touch, especially when a device's
  // touch-to-mouse compatibility click isn't fully suppressed. Because
  // lastTapRef is a ref (mutated synchronously, unlike state), a stray
  // duplicate of the SAME touch would land right after the real one, see
  // itself as "the previous tap" at distance 0, and get misread as a
  // deliberate double-tap - closing the route after just one or two real
  // points. A genuine human double-tap always has more than a few tens of
  // milliseconds between the two touches; a synthesized duplicate of the
  // same touch does not. This guard swallows only the latter.
  //
  // R15.3: lastHandledRef also stores position (see isDuplicateStageEvent) -
  // a time-only guard was dropping the second of two genuine fast taps at
  // different coordinates (a tight cone slalom), not just misreading it.
  const lastHandledRef = useRef<LastStageEvent | null>(null);

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

  useEffect(() => {
    if (!handleRef) return;
    handleRef.current = {
      isEmpty: () => history.present.length === 0,
      getElements: () => history.present,
      exportPng: () => {
        const stage = stageRef.current;
        if (!stage || history.present.length === 0) return null;
        const pixelRatio = Math.min(
          2,
          EXPORT_TARGET_WIDTH / (containerSize.width || EXPORT_TARGET_WIDTH),
        );
        return stage.toDataURL({ mimeType: "image/png", pixelRatio });
      },
    };
  }, [handleRef, history.present, containerSize.width]);

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
        dispatch({
          type: "update",
          id: selectedId,
          patch: { points: nextPoints },
        });
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
  }, [
    pendingAction,
    drawingPath,
    selectedId,
    selectedPointIndex,
    history.present,
  ]);

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
        drawingPath.curved,
      );
      dispatch({ type: "add", element: el });
      setSelectedId(el.id);
      setSelectedPointIndex(null);
    }
    cancelDrawingPath();
    setActiveTool("select");
  }

  function handleCurveModeChange(mode: "sharp" | "smooth") {
    setCurveMode(mode);
    setDrawingPath((current) =>
      current ? { ...current, curved: mode === "smooth" } : current,
    );
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
      if (isDoubleTapToFinish(now, pos, last, scale)) {
        finishDrawingPath();
        return;
      }
      setDrawingPath({ ...drawingPath, points: [...drawingPath.points, pos] });
      lastTapRef.current = { time: now, pos };
      return;
    }

    setDrawingPath({
      toolId: tool.id,
      style: tool.kind.style,
      points: [pos],
      curved: Boolean(tool.kind.curvable) && curveMode === "smooth",
    });
    lastTapRef.current = { time: now, pos };
  }

  function handleStageClick(
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent>,
  ) {
    if (e.target !== stageRef.current) return;
    const now = Date.now();
    const pos = getPointer();
    if (pos && isDuplicateStageEvent(now, pos, lastHandledRef.current, scale)) {
      return;
    }
    lastHandledRef.current = pos ? { time: now, pos } : null;
    if (activeTool === "select") {
      setSelectedId(null);
      setSelectedPointIndex(null);
      return;
    }
    const tool = findTool(activeTool);
    if (!tool) return;
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
      // One placement per tool choice, then back to the pointer - so the
      // very next tap can select/move/delete what was just placed instead
      // of stacking another element on top of it.
      setActiveTool("select");
      return;
    }
    if (tool.kind.create === "fullWidthLine") {
      const el = createFullWidthLine(
        tool.id,
        tool.kind.style,
        tool.kind.orientation,
        pos,
        dims.width,
        dims.height,
      );
      dispatch({ type: "add", element: el });
      setSelectedId(el.id);
      setSelectedPointIndex(null);
      setActiveTool("select");
      return;
    }
    handlePathTap(tool, pos);
  }

  function handleStagePointerMove(e: Konva.KonvaEventObject<MouseEvent>) {
    if (!drawingPath) return;
    e.evt.preventDefault();
    const pos = getPointer();
    if (pos) setPreviewCursor(pos);
  }

  // Mobile browsers synthesize a full mousedown/mouseup/click sequence
  // after every touchstart/touchend unless that default is prevented -
  // Konva itself only calls preventDefault() when the touch lands on a
  // listening shape (see Konva's Stage._pointerdown), so a tap on empty
  // canvas or on a shape that isn't listening (e.g. every element while a
  // placement tool is active) falls through and fires twice: once as a
  // real "tap", once again moments later as a synthesized "click". That
  // stray second click on the Stage is what silently doubled up path
  // points and placed duplicate elements. Preventing the default here, at
  // the very start of the touch, stops the browser from ever emitting
  // that synthetic follow-up.
  function handleStageTouchStart(e: Konva.KonvaEventObject<TouchEvent>) {
    if (e.evt.cancelable) e.evt.preventDefault();
  }

  // Belt-and-suspenders alongside the container's touch-none/overscroll
  // CSS: while a route is being drawn, make sure a finger dragging across
  // the canvas can never be interpreted as a page scroll/zoom gesture.
  function handleStageTouchMove(e: Konva.KonvaEventObject<TouchEvent>) {
    if (drawingPath && e.evt.cancelable) e.evt.preventDefault();
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

  function handlePathPointDragEnd(id: string, index: number, pos: BoardPoint) {
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

  // The sport is chosen externally now (the exercise's "Dyscyplina" field),
  // not by a selector inside the board. That field change is itself the
  // coach's confirmation, so apply it immediately rather than gating it
  // behind a second in-board prompt the outer <select> has no way to
  // resolve if the coach dismissed it - just surface a one-off notice when
  // it actually discarded something.
  useEffect(() => {
    if (sportId !== null && sportId !== selectedSportId) {
      const hadElements = history.present.length > 0;
      applySportChange(sportId);
      if (hadElements) {
        dispatch({ type: "clear" });
        setSportSwitchNotice(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sportId]);

  function handleClearRequest() {
    if (history.present.length === 0) return;
    setPendingAction({ type: "clear" });
  }

  function confirmPendingAction() {
    if (!pendingAction) return;
    cancelDrawingPath();
    if (pendingAction.type === "fieldMode") {
      setFieldModeId(pendingAction.modeId);
    }
    dispatch({ type: "clear" });
    setSelectedId(null);
    setSelectedPointIndex(null);
    setPendingAction(null);
  }

  // Frozen while a destructive action (clear / field view switch) awaits
  // confirmation, so nothing drawn in the meantime can be silently wiped
  // out by a stale "Tak".
  const frozenClassName = pendingAction
    ? "pointer-events-none opacity-60"
    : undefined;

  const drawingPreviewPoints =
    drawingPath && previewCursor
      ? [...drawingPath.points, previewCursor]
      : (drawingPath?.points ?? []);
  const drawingPreviewCurvedPoints =
    drawingPath?.curved && drawingPreviewPoints.length >= 2
      ? smoothPathPoints(drawingPreviewPoints)
      : drawingPreviewPoints;
  const drawingPreviewRenderPoints = drawingPath?.style.wavy
    ? wavyPathPoints(drawingPreviewCurvedPoints)
    : drawingPreviewCurvedPoints;

  const drawingTool = drawingPath ? findTool(drawingPath.toolId) : null;
  const drawingToolCurvable =
    drawingTool?.kind.create === "path" && Boolean(drawingTool.kind.curvable);

  return (
    <div className="flex flex-col gap-3">
      {activeSport && (
        <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Boisko: {activeSport.name_pl}
        </p>
      )}

      {sportSwitchNotice && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
          <span>Zmiana dyscypliny wyczyściła dotychczasowy rysunek.</span>
          <button
            type="button"
            onClick={() => setSportSwitchNotice(false)}
            aria-label="Zamknij"
            className="shrink-0 text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-200"
          >
            ×
          </button>
        </div>
      )}

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
              : "Zmiana widoku boiska wyczyści obecny rysunek. Kontynuować?"}
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
          curveMode={drawingToolCurvable ? curveMode : null}
          onCurveModeChange={handleCurveModeChange}
        />
      )}

      <div
        ref={containerRef}
        className={`w-full touch-none overscroll-contain overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 ${frozenClassName ?? ""}`}
        style={{
          aspectRatio: `${dims.width} / ${dims.height}`,
          touchAction: "none",
          overscrollBehavior: "contain",
        }}
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
            onTouchStart={handleStageTouchStart}
            onTouchMove={handleStageTouchMove}
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
                  points={flattenPoints(drawingPreviewRenderPoints)}
                  tension={0}
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
        Wskazówka: każde narzędzie umieszcza jeden element i od razu wraca do
        Wskaźnika - dotknij zawodnika albo trasę, żeby ją zaznaczyć,
        przeciągnij, żeby przesunąć, i użyj „Usuń”, żeby skasować. Dwukrotne
        dotknięcie zawodnika nadaje mu numer. Rysując trasę, stukaj kolejne
        punkty i zakończ dwukrotnym dotknięciem lub przyciskiem „Gotowe”.
        Zaznaczoną trasę przeciągasz jako całość albo za pojedyncze punkty, żeby
        ją przekształcić.
      </p>
    </div>
  );
}
