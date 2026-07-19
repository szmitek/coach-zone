import { AF_FULL_HEIGHT, AF_FULL_WIDTH } from "@/components/board/fields/AmericanFootballField";
import { americanFootballConfig } from "@/lib/board/sports/americanFootball";
import { basketballConfig } from "@/lib/board/sports/basketball";
import { footballConfig } from "@/lib/board/sports/football";
import type { SportBoardConfig } from "@/lib/board/sports/types";
import type { ShowcaseScene } from "./types";

// Every stroke color/width/dash below is read directly off the real
// per-sport tool defs (lib/board/sports/*.tsx) - never invented - so what
// animates here is styled identically to what the coach draws with that
// same tool moments later on the real board.
export function toolStyle(config: SportBoardConfig, toolId: string) {
  const tool = config.tools.find((t) => t.id === toolId);
  if (!tool || tool.kind.create !== "path") {
    throw new Error(`Showcase: tool "${toolId}" not found or not a path tool`);
  }
  return tool.kind.style;
}

// ---------------------------------------------------------------------------
// American football: QB + WR appear, the WR's route draws itself, then a
// pass arcs from the QB to where the route ends.
// ---------------------------------------------------------------------------
const afRoute = toolStyle(americanFootballConfig, "route");

const wrStart = { x: 560, y: 96 };
const routeEnd = { x: 900, y: 236 };
const qbPos = { x: 500, y: 320 };

export const americanFootballScene: ShowcaseScene = {
  sportSlug: "american_football",
  fieldModeId: "full",
  caption: "Tak rysujesz trasę zawodnika.",
  markers: [
    { id: "qb", kind: "qb", x: qbPos.x, y: qbPos.y, label: "QB", appearAt: 0 },
    { id: "wr", kind: "player", x: wrStart.x, y: wrStart.y, label: "WR", appearAt: 200 },
  ],
  paths: [
    {
      id: "route",
      points: [wrStart, { x: 760, y: 96 }, routeEnd],
      color: afRoute.color,
      strokeWidth: afRoute.strokeWidth,
      headStyle: afRoute.headStyle,
      curved: true,
      startAt: 900,
      duration: 1700,
    },
    {
      id: "pass",
      points: [qbPos, routeEnd],
      color: afRoute.color,
      strokeWidth: afRoute.strokeWidth,
      headStyle: afRoute.headStyle,
      curved: true,
      startAt: 3100,
      duration: 1000,
    },
  ],
  scriptedDuration: 4100,
};

export const AF_FIELD_SIZE = { width: AF_FULL_WIDTH, height: AF_FULL_HEIGHT };

// ---------------------------------------------------------------------------
// Basketball: a player dribbles (wavy path, matching the real dribble
// tool), then a shot line arcs to the hoop.
// ---------------------------------------------------------------------------
const bbDribble = toolStyle(basketballConfig, "dribble");
const bbShot = toolStyle(basketballConfig, "shot");

const ballStart = { x: 470, y: 270 };
const dribbleEnd = { x: 790, y: 270 };
// Right-side hoop centre for the "full" court mode - see BasketballField's
// EndMarkings: basketX = goalX + dir * BASKET_DEPTH * scaleX, dir=-1 at the
// right edge, matching the constants used there.
const hoop = { x: 866, y: 270 };

export const basketballScene: ShowcaseScene = {
  sportSlug: "basketball",
  fieldModeId: "full",
  caption: "Tak powstaje akcja pod koszem.",
  markers: [{ id: "player", kind: "player", x: ballStart.x, y: ballStart.y, appearAt: 0 }],
  paths: [
    {
      id: "dribble",
      points: [ballStart, { x: 600, y: 200 }, { x: 700, y: 330 }, dribbleEnd],
      color: bbDribble.color,
      strokeWidth: bbDribble.strokeWidth,
      headStyle: bbDribble.headStyle,
      wavy: true,
      startAt: 500,
      duration: 1700,
    },
    {
      id: "shot",
      points: [dribbleEnd, hoop],
      color: bbShot.color,
      strokeWidth: bbShot.strokeWidth,
      headStyle: bbShot.headStyle,
      curved: true,
      startAt: 2700,
      duration: 950,
    },
  ],
  scriptedDuration: 3650,
};

// ---------------------------------------------------------------------------
// Soccer: a player dribbles through a slalom of cones, the weaving path
// drawing itself smoothly between them.
// ---------------------------------------------------------------------------
const soccerMove = toolStyle(footballConfig, "movement");

const slalomCones = [
  { x: 650, y: 340 },
  { x: 720, y: 340 },
  { x: 790, y: 340 },
  { x: 860, y: 340 },
];
const slalomStart = { x: 580, y: 340 };
const slalomEnd = { x: 920, y: 340 };

export const soccerScene: ShowcaseScene = {
  sportSlug: "football",
  fieldModeId: "full",
  caption: "Tak prowadzisz zawodnika przez pachołki.",
  markers: [
    { id: "player", kind: "player", x: slalomStart.x, y: slalomStart.y, appearAt: 0 },
    ...slalomCones.map((c, i) => ({
      id: `cone-${i}`,
      kind: "cone" as const,
      x: c.x,
      y: c.y,
      appearAt: 150 + i * 90,
    })),
  ],
  paths: [
    {
      id: "slalom",
      points: [
        slalomStart,
        { x: slalomCones[0].x, y: 296 },
        { x: slalomCones[1].x, y: 384 },
        { x: slalomCones[2].x, y: 296 },
        { x: slalomCones[3].x, y: 384 },
        slalomEnd,
      ],
      color: soccerMove.color,
      strokeWidth: soccerMove.strokeWidth,
      headStyle: soccerMove.headStyle,
      // The real "movement" tool isn't curvable on the live board, but the
      // showcase wants a smooth weave rather than sharp zig-zag turns -
      // this only affects how this scripted demo renders, not the tool.
      curved: true,
      startAt: 700,
      duration: 2200,
    },
  ],
  scriptedDuration: 2900,
};

export const showcaseScenes: ShowcaseScene[] = [
  americanFootballScene,
  basketballScene,
  soccerScene,
];
