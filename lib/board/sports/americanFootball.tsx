import {
  AF_FULL_HEIGHT,
  AF_FULL_WIDTH,
  AF_REDZONE_HEIGHT,
  AF_REDZONE_WIDTH,
  AmericanFootballField,
} from "@/components/board/fields/AmericanFootballField";
import {
  BallIcon,
  BlockIcon,
  ConeIcon,
  GateIcon,
  HurdlesIcon,
  LadderIcon,
  OpponentIcon,
  PartnerIcon,
  PlayerIcon,
  QbIcon,
  RunArrowIcon,
  ScrimmageIcon,
  ShieldIcon,
} from "@/components/board/icons";
import type { SportBoardConfig } from "./types";

export const americanFootballConfig: SportBoardConfig = {
  slug: "american_football",
  fieldModes: [
    { id: "full", label: "Całe boisko", width: AF_FULL_WIDTH, height: AF_FULL_HEIGHT },
    {
      id: "redzone",
      label: "Strefa końcowa",
      width: AF_REDZONE_WIDTH,
      height: AF_REDZONE_HEIGHT,
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
      id: "partner",
      label: "Partner",
      icon: <PartnerIcon />,
      kind: { create: "point", elementKind: "partner", defaultLabel: "P" },
    },
    {
      id: "shield",
      label: "Tarcza",
      icon: <ShieldIcon />,
      kind: { create: "point", elementKind: "shield" },
    },
    {
      id: "gate",
      label: "Bramka",
      icon: <GateIcon />,
      kind: { create: "point", elementKind: "gate" },
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
      id: "route",
      label: "Trasa biegu",
      icon: <RunArrowIcon />,
      kind: {
        create: "path",
        style: { color: "#111827", strokeWidth: 4, headStyle: "arrow" },
        curvable: true,
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
        // The field's yard lines run vertically (constant x), so the line
        // of scrimmage - which marks a single yard - must too.
        orientation: "vertical",
      },
    },
  ],
};
