import { BasketballField } from "@/components/board/fields/BasketballField";
import {
  BallIcon,
  ConeIcon,
  DribbleIcon,
  HurdlesIcon,
  LadderIcon,
  OpponentIcon,
  PartnerIcon,
  PassLineIcon,
  PlayerIcon,
  RunArrowIcon,
  ShotArcIcon,
} from "@/components/board/icons";
import type { SportBoardConfig } from "./types";

export const basketballConfig: SportBoardConfig = {
  slug: "basketball",
  fieldModes: [
    { id: "full", label: "Całe boisko", width: 940, height: 540 },
    { id: "half", label: "Połowa boiska", width: 560, height: 520 },
  ],
  defaultFieldModeId: "full",
  FieldComponent: BasketballField,
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
      id: "cone",
      label: "Pachołek",
      icon: <ConeIcon />,
      kind: { create: "point", elementKind: "cone" },
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
      id: "dribble",
      label: "Kozłowanie",
      icon: <DribbleIcon />,
      kind: {
        create: "path",
        style: { color: "#ea580c", strokeWidth: 4, headStyle: "none", wavy: true },
      },
    },
    {
      id: "passLine",
      label: "Podanie",
      icon: <PassLineIcon />,
      kind: {
        create: "path",
        style: {
          color: "#7c3aed",
          strokeWidth: 4,
          headStyle: "arrow",
          dash: [14, 10],
        },
      },
    },
    {
      id: "shot",
      label: "Rzut",
      icon: <ShotArcIcon />,
      kind: {
        create: "path",
        style: { color: "#dc2626", strokeWidth: 4, headStyle: "arrow" },
        curvable: true,
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
