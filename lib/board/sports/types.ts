import type { ComponentType, ReactNode } from "react";
import type { PathHeadStyle, PointElementType } from "../types";

export interface FieldViewMode {
  id: string;
  label: string;
  /** Logical (unscaled) stage size for this mode - the stage is scaled to
   * fit its container, so these just need a sensible aspect ratio. */
  width: number;
  height: number;
}

export interface FieldRendererProps {
  modeId: string;
  width: number;
  height: number;
}

export interface PathToolStyle {
  color: string;
  strokeWidth: number;
  headStyle: PathHeadStyle;
  dash?: number[];
  wavy?: boolean;
}

export type ToolKind =
  | { create: "point"; elementKind: PointElementType; defaultLabel?: string }
  | {
      create: "path";
      style: PathToolStyle;
      curvable?: boolean;
      /** Auto-finishes the path as soon as this many points are placed,
       * instead of waiting for a double-tap or "Gotowe" - used for
       * stretchable equipment (ladder, hurdle row) drawn as a single
       * start -> end gesture rather than a multi-point route. */
      maxPoints?: number;
    }
  | {
      create: "fullWidthLine";
      style: PathToolStyle;
      /** Must match the field's own yard/pitch-line grain. */
      orientation: "horizontal" | "vertical";
    };

export interface ToolDef {
  id: string;
  label: string;
  icon: ReactNode;
  kind: ToolKind;
}

/**
 * Everything the board needs to know about a sport: what the field looks
 * like and what tools are on the palette. Adding a new sport means adding
 * one of these and registering it in `registry.ts` - no changes to the
 * board engine itself.
 */
export interface SportBoardConfig {
  slug: string;
  fieldModes: FieldViewMode[];
  defaultFieldModeId: string;
  FieldComponent: ComponentType<FieldRendererProps>;
  tools: ToolDef[];
}
