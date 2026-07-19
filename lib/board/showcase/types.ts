import type { BoardPoint, PathHeadStyle, PointElementType } from "@/lib/board/types";

/** A player/ball/cone marker that fades in at a given moment in the scene. */
export interface ShowcaseMarker {
  id: string;
  kind: PointElementType;
  x: number;
  y: number;
  label?: string;
  /** ms into the scene when the fade-in begins. */
  appearAt: number;
}

/**
 * A path (route / dribble / shot / pass) that draws itself progressively.
 * Styling mirrors `PathToolStyle` from the real per-sport tool defs exactly,
 * so a route drawn here uses the identical color/width/dash the real board
 * uses for that same tool.
 */
export interface ShowcasePath {
  id: string;
  points: BoardPoint[];
  color: string;
  strokeWidth: number;
  headStyle: PathHeadStyle;
  dash?: number[];
  curved?: boolean;
  wavy?: boolean;
  /**
   * Set for training-equipment paths (the real "ladder"/"hurdles" tools,
   * which are 2-point strips rather than a drawn route) so they render as
   * the actual rails/rungs or hurdle row PathElementNode draws on the live
   * board, instead of a plain stroked line.
   */
  kind?: "ladder" | "hurdles";
  /** ms into the scene when drawing starts. */
  startAt: number;
  /** how long the reveal animation takes, in ms. */
  duration: number;
}

export interface ShowcaseScene {
  /** Sport slug, resolved via getSportConfig - the same lookup the real board uses. */
  sportSlug: string;
  fieldModeId: string;
  /** Polish caption describing the moment, shown only in the onboarding variant. */
  caption: string;
  markers: ShowcaseMarker[];
  paths: ShowcasePath[];
  /** Total scripted duration (last animation end), excluding the hold/pause after it. */
  scriptedDuration: number;
}
