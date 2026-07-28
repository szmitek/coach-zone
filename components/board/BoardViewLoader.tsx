"use client";

// Konva/react-konva touch the canvas APIs at import time, so the read-only
// view is loaded client-only and dynamically - it must never be part of
// the server render, same as TacticsBoardLoader.
import dynamic from "next/dynamic";
import type { BoardElement } from "@/lib/board/types";
import { BoardViewSkeleton } from "./BoardViewSkeleton";

const BoardView = dynamic(
  () => import("./BoardView").then((mod) => mod.BoardView),
  { ssr: false, loading: () => <BoardViewSkeleton /> },
);

export function BoardViewLoader({
  sportSlug,
  fieldModeId,
  elements,
}: {
  sportSlug?: string | null;
  fieldModeId?: string | null;
  elements: BoardElement[];
}) {
  return (
    <BoardView
      sportSlug={sportSlug}
      fieldModeId={fieldModeId}
      elements={elements}
    />
  );
}
