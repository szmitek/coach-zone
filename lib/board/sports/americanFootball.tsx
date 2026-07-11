import {
  AF_FULL_HEIGHT,
  AF_FULL_WIDTH,
  AF_ZOOM_HEIGHT,
  AF_ZOOM_WIDTH,
  AmericanFootballField,
} from "@/components/board/fields/AmericanFootballField";
import {
  BallIcon,
  BlockIcon,
  ConeIcon,
  OpponentIcon,
  PlayerIcon,
  QbIcon,
  RunArrowIcon,
  ScrimmageIcon,
} from "@/components/board/icons";
import type { SportBoardConfig } from "./types";

export const americanFootballConfig: SportBoardConfig = {
  slug: "american_football",
  fieldModes: [
    { id: "full", label: "Całe boisko", width: AF_FULL_WIDTH, height: AF_FULL_HEIGHT },
    {
      id: "zoom",
      label: "Fragment (linia rozgrywki)",
      width: AF_ZOOM_WIDTH,
      height: AF_ZOOM_HEIGHT,
    },
  ],
  defaultFieldModeId: "full",
  FieldComponent: AmericanFootballField,
  tools: [
    {
      id: "offense",
      label: "Zawodnik ofensywny",
      icon: <PlayerIcon />,
      kind: { create: "point", elementKind: "player" },
    },
    {
      id: "defense",
      label: "Zawodnik defensywny",
      icon: <OpponentIcon />,
      kind: { create: "point", elementKind: "opponent" },
    },
    {
      id: "qb",
      label: "Rozgrywający (QB)",
      icon: <QbIcon />,
      kind: { create: "point", elementKind: "qb", defaultLabel: "QB" },
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
      id: "route",
      label: "Trasa biegu",
      icon: <RunArrowIcon />,
      kind: {
        create: "path",
        style: { color: "#111827", strokeWidth: 4, headStyle: "arrow" },
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
      id: "scrimmage",
      label: "Linia rozpoczęcia akcji",
      icon: <ScrimmageIcon />,
      kind: {
        create: "fullWidthLine",
        style: { color: "#1d4ed8", strokeWidth: 5, headStyle: "none" },
      },
    },
  ],
};
