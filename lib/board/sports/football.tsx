import { SoccerField } from "@/components/board/fields/SoccerField";
import {
  BallIcon,
  ConeIcon,
  OpponentIcon,
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
