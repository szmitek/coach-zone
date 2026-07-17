import { VolleyballField } from "@/components/board/fields/VolleyballField";
import {
  AttackIcon,
  BallArcIcon,
  BallIcon,
  BlockIcon,
  HurdlesIcon,
  LadderIcon,
  OpponentIcon,
  PartnerIcon,
  PlayerIcon,
  RunArrowIcon,
  ServeIcon,
} from "@/components/board/icons";
import type { SportBoardConfig } from "./types";

export const volleyballConfig: SportBoardConfig = {
  slug: "volleyball",
  // A volleyball court is small enough to always show whole - no half-court mode.
  fieldModes: [{ id: "full", label: "Boisko", width: 852, height: 474 }],
  defaultFieldModeId: "full",
  FieldComponent: VolleyballField,
  tools: [
    {
      id: "player",
      label: "Zawodnik",
      icon: <PlayerIcon />,
      kind: { create: "point", elementKind: "player" },
    },
    {
      id: "opponent",
      label: "Przeciwnik",
      icon: <OpponentIcon />,
      kind: { create: "point", elementKind: "opponent" },
    },
    {
      id: "ball",
      label: "Piłka",
      icon: <BallIcon />,
      kind: { create: "point", elementKind: "ball" },
    },
    {
      id: "partner",
      label: "Partner",
      icon: <PartnerIcon />,
      kind: { create: "point", elementKind: "partner", defaultLabel: "P" },
    },
    {
      id: "ladder",
      label: "Drabinka",
      icon: <LadderIcon />,
      kind: {
        create: "path",
        style: { color: "#dc2626", strokeWidth: 3, headStyle: "none" },
        maxPoints: 2,
      },
    },
    {
      id: "hurdles",
      label: "Płotki",
      icon: <HurdlesIcon />,
      kind: {
        create: "path",
        style: { color: "#dc2626", strokeWidth: 3, headStyle: "none" },
        maxPoints: 2,
      },
    },
    {
      id: "trajectory",
      label: "Trajektoria piłki",
      icon: <BallArcIcon />,
      kind: {
        create: "path",
        style: { color: "#0891b2", strokeWidth: 4, headStyle: "none" },
        curvable: true,
      },
    },
    {
      id: "serve",
      label: "Zagrywka",
      icon: <ServeIcon />,
      kind: {
        create: "path",
        style: {
          color: "#f59e0b",
          strokeWidth: 4,
          headStyle: "arrow",
          dash: [14, 10],
        },
      },
    },
    {
      id: "attack",
      label: "Atak",
      icon: <AttackIcon />,
      kind: {
        create: "path",
        style: { color: "#b91c1c", strokeWidth: 5, headStyle: "arrow" },
      },
    },
    {
      id: "block",
      label: "Blok",
      icon: <BlockIcon />,
      kind: {
        create: "path",
        style: { color: "#b91c1c", strokeWidth: 5, headStyle: "bar" },
      },
    },
    {
      id: "route",
      label: "Trasa biegu",
      icon: <RunArrowIcon />,
      kind: {
        create: "path",
        style: { color: "#111827", strokeWidth: 4, headStyle: "arrow" },
        curvable: true,
      },
    },
  ],
};
