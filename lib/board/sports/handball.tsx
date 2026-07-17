import { HandballField } from "@/components/board/fields/HandballField";
import {
  BallIcon,
  ConeIcon,
  HandballShotIcon,
  HurdlesIcon,
  LadderIcon,
  OpponentIcon,
  PartnerIcon,
  PassLineIcon,
  PlayerIcon,
  RunArrowIcon,
} from "@/components/board/icons";
import type { SportBoardConfig } from "./types";

export const handballConfig: SportBoardConfig = {
  slug: "handball",
  fieldModes: [
    { id: "full", label: "Całe boisko", width: 1008, height: 528 },
    { id: "half", label: "Połowa boiska", width: 528, height: 528 },
  ],
  defaultFieldModeId: "full",
  FieldComponent: HandballField,
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
      icon: <HandballShotIcon />,
      kind: {
        create: "path",
        style: { color: "#dc2626", strokeWidth: 4, headStyle: "arrow" },
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
