"use client";

// Konva/react-konva touch the canvas APIs at import time, so the editor
// is loaded client-only and dynamically - it must never be part of the
// server render.
import dynamic from "next/dynamic";
import type { Sport } from "@/lib/supabase/types";
import { BoardSkeleton } from "./BoardSkeleton";

const TacticsBoard = dynamic(
  () => import("./TacticsBoard").then((mod) => mod.TacticsBoard),
  { ssr: false, loading: () => <BoardSkeleton /> },
);

export function TacticsBoardLoader({ sports }: { sports: Sport[] }) {
  return <TacticsBoard sports={sports} />;
}
