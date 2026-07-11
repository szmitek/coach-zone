"use client";

// Konva/react-konva touch the canvas APIs at import time, so the editor
// is loaded client-only and dynamically - it must never be part of the
// server render.
import dynamic from "next/dynamic";
import type { MutableRefObject } from "react";
import type { BoardElement } from "@/lib/board/types";
import type { Sport } from "@/lib/supabase/types";
import { BoardSkeleton } from "./BoardSkeleton";
import type { TacticsBoardHandle } from "./TacticsBoard";

const TacticsBoard = dynamic(
  () => import("./TacticsBoard").then((mod) => mod.TacticsBoard),
  { ssr: false, loading: () => <BoardSkeleton /> },
);

export function TacticsBoardLoader({
  sports,
  sportId,
  initialElements,
  handleRef,
}: {
  sports: Sport[];
  sportId?: number | null;
  initialElements?: BoardElement[];
  handleRef?: MutableRefObject<TacticsBoardHandle | null>;
}) {
  return (
    <TacticsBoard
      sports={sports}
      sportId={sportId}
      initialElements={initialElements}
      handleRef={handleRef}
    />
  );
}
