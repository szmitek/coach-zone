import { SoccerField } from "@/components/board/fields/SoccerField";
import {
  BallIcon,
  ConeIcon,
  HurdlesIcon,
  LadderIcon,
  OpponentIcon,
  PartnerIcon,
  PassLineIcon,
  PlayerIcon,
  RunArrowIcon,
} from "@/components/board/icons";
import type { SportBoardConfig } from "./types";

export const footballConfig: SportBoardConfig = {
  slug: "football",
  fieldModes: [
    { id: "full", label: "Pełne boisko", width: 1040, height: 680 },
    { id: "half", label: "Połowa boiska", width: 680, height: 540 },
  ],
  defaultFieldModeId: "full",
  FieldComponent: SoccerField,
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
        style: { color: "#059669", strokeWidth: 3, headStyle: "none" },
        maxPoints: 2,
      },
    },
    {
      id: "hurdles",
      label: "Płotki",
      icon: <HurdlesIcon />,
      kind: {
        create: "path",
        style: { color: "#059669", strokeWidth: 3, headStyle: "none" },
        maxPoints: 2,
      },
    },
    {
      id: "movement",
      label: "Strzałka ruchu",
      icon: <RunArrowIcon />,
      kind: {
        create: "path",
        style: { color: "#111827", strokeWidth: 4, headStyle: "arrow" },
      },
    },
    {
      id: "passLine",
      label: "Linia podania",
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
  ],
};
