import { GenericField } from "@/components/board/fields/GenericField";
import {
  BallIcon,
  ConeIcon,
  OpponentIcon,
  PlayerIcon,
  RunArrowIcon,
} from "@/components/board/icons";
import type { SportBoardConfig } from "./types";

// Used for any sport without a dedicated config yet (basketball,
// volleyball, handball this round) - a plain field with the same
// generic tool set every sport shares, so the board never crashes on an
// unrecognized sport.
export const fallbackConfig: SportBoardConfig = {
  slug: "fallback",
  fieldModes: [{ id: "full", label: "Boisko", width: 900, height: 600 }],
  defaultFieldModeId: "full",
  FieldComponent: GenericField,
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
  ],
};
