import { americanFootballConfig } from "@/lib/board/sports/americanFootball";
import { basketballConfig } from "@/lib/board/sports/basketball";
import { footballConfig } from "@/lib/board/sports/football";
import { toolStyle } from "./scenes";
import type { ShowcaseScene } from "./types";

// Landing-only choreography. Onboarding (scenes.ts / showcaseScenes) builds
// one thing at a time because it's teaching a coach how each tool works -
// this instead composes a fuller scene per sport (multiple players, more
// than one route/action, training equipment) with everything staggered so
// a visitor sees "this is a real tactical tool" within a couple of
// seconds, not "this draws a line". Same real per-sport tool defs/colors
// as the onboarding scenes - nothing invented, still pixel-identical to
// the live board. This file is only ever imported by LandingShowcase.

// ---------------------------------------------------------------------------
// American football: a full passing-play picture - two receivers running
// routes on either side, a defender covering one of them, a quick block
// off the snap, pre-snap cones marking the formation width, and a shield
// nearby, before the QB's pass connects.
// ---------------------------------------------------------------------------
const afRoute = toolStyle(americanFootballConfig, "route");
const afBlock = toolStyle(americanFootballConfig, "block");

const afQb = { x: 500, y: 320 };
const afWr1Start = { x: 560, y: 96 };
const afWr1End = { x: 900, y: 236 };
const afWr2Start = { x: 560, y: 430 };
const afWr2End = { x: 780, y: 378 };

export const landingAmericanFootballScene: ShowcaseScene = {
  sportSlug: "american_football",
  fieldModeId: "full",
  caption: "Pełny obraz akcji ofensywnej.",
  markers: [
    { id: "qb", kind: "qb", x: afQb.x, y: afQb.y, label: "QB", appearAt: 0 },
    { id: "cone-a", kind: "cone", x: 500, y: 190, appearAt: 40 },
    { id: "cone-b", kind: "cone", x: 500, y: 450, appearAt: 90 },
    { id: "shield", kind: "shield", x: 430, y: 250, appearAt: 220 },
    { id: "wr1", kind: "player", x: afWr1Start.x, y: afWr1Start.y, label: "WR", appearAt: 150 },
    { id: "wr2", kind: "player", x: afWr2Start.x, y: afWr2Start.y, label: "WR", appearAt: 150 },
    { id: "defender", kind: "opponent", x: 760, y: 410, appearAt: 480 },
  ],
  paths: [
    {
      id: "block",
      points: [{ x: 430, y: 250 }, { x: 480, y: 258 }],
      color: afBlock.color,
      strokeWidth: afBlock.strokeWidth,
      headStyle: afBlock.headStyle,
      startAt: 350,
      duration: 450,
    },
    {
      id: "route2",
      points: [afWr2Start, { x: 700, y: 430 }, afWr2End],
      color: afRoute.color,
      strokeWidth: afRoute.strokeWidth,
      headStyle: afRoute.headStyle,
      curved: true,
      startAt: 550,
      duration: 1200,
    },
    {
      id: "route1",
      points: [afWr1Start, { x: 760, y: 96 }, afWr1End],
      color: afRoute.color,
      strokeWidth: afRoute.strokeWidth,
      headStyle: afRoute.headStyle,
      curved: true,
      startAt: 700,
      duration: 1700,
    },
    {
      id: "pass",
      points: [afQb, afWr1End],
      color: afRoute.color,
      strokeWidth: afRoute.strokeWidth,
      headStyle: afRoute.headStyle,
      curved: true,
      startAt: 2600,
      duration: 1000,
    },
  ],
  scriptedDuration: 3600,
};

// ---------------------------------------------------------------------------
// Basketball: a ball handler works off an agility ladder and a dribble
// gate, a defender steps up, then a pass to a teammate sets up the shot.
// ---------------------------------------------------------------------------
const bbDribble = toolStyle(basketballConfig, "dribble");
const bbShot = toolStyle(basketballConfig, "shot");
const bbPass = toolStyle(basketballConfig, "passLine");

const bbBallStart = { x: 470, y: 270 };
const bbDribbleEnd = { x: 790, y: 270 };
const bbTeammate = { x: 760, y: 150 };
const bbHoop = { x: 866, y: 270 };

export const landingBasketballScene: ShowcaseScene = {
  sportSlug: "basketball",
  fieldModeId: "full",
  caption: "Tak powstaje cała akcja pod koszem.",
  markers: [
    { id: "player", kind: "player", x: bbBallStart.x, y: bbBallStart.y, appearAt: 0 },
    { id: "cone-a", kind: "cone", x: 520, y: 340, appearAt: 40 },
    { id: "cone-b", kind: "cone", x: 520, y: 210, appearAt: 90 },
    { id: "defender", kind: "opponent", x: 650, y: 220, appearAt: 400 },
    { id: "teammate", kind: "partner", x: bbTeammate.x, y: bbTeammate.y, label: "P", appearAt: 900 },
  ],
  paths: [
    {
      id: "ladder",
      kind: "ladder",
      points: [{ x: 70, y: 460 }, { x: 220, y: 460 }],
      color: "#dc2626",
      strokeWidth: 3,
      headStyle: "none",
      startAt: 150,
      duration: 550,
    },
    {
      id: "dribble",
      points: [bbBallStart, { x: 600, y: 200 }, { x: 700, y: 330 }, bbDribbleEnd],
      color: bbDribble.color,
      strokeWidth: bbDribble.strokeWidth,
      headStyle: bbDribble.headStyle,
      wavy: true,
      startAt: 350,
      duration: 1600,
    },
    {
      id: "passLine",
      points: [bbDribbleEnd, bbTeammate],
      color: bbPass.color,
      strokeWidth: bbPass.strokeWidth,
      headStyle: bbPass.headStyle,
      dash: bbPass.dash,
      startAt: 1500,
      duration: 650,
    },
    {
      id: "shot",
      points: [bbTeammate, bbHoop],
      color: bbShot.color,
      strokeWidth: bbShot.strokeWidth,
      headStyle: bbShot.headStyle,
      curved: true,
      startAt: 2300,
      duration: 900,
    },
  ],
  scriptedDuration: 3200,
};

// ---------------------------------------------------------------------------
// Soccer: the slalom drill runs through a full agility circuit - hurdles
// and a ladder as stations either side of the cones - a defender is beaten,
// and the move finishes with a pass to a teammate making the run.
// ---------------------------------------------------------------------------
const soccerMove = toolStyle(footballConfig, "movement");
const soccerPass = toolStyle(footballConfig, "passLine");

const slalomCones = [
  { x: 650, y: 340 },
  { x: 720, y: 340 },
  { x: 790, y: 340 },
  { x: 860, y: 340 },
];
const slalomStart = { x: 580, y: 340 };
const slalomEnd = { x: 920, y: 340 };
const soccerTeammate = { x: 980, y: 260 };

export const landingSoccerScene: ShowcaseScene = {
  sportSlug: "football",
  fieldModeId: "full",
  caption: "Cały tor zwinnościowy w akcji.",
  markers: [
    { id: "player", kind: "player", x: slalomStart.x, y: slalomStart.y, appearAt: 0 },
    ...slalomCones.map((c, i) => ({
      id: `cone-${i}`,
      kind: "cone" as const,
      x: c.x,
      y: c.y,
      appearAt: 60 + i * 90,
    })),
    { id: "defender", kind: "opponent" as const, x: 700, y: 420, appearAt: 500 },
    { id: "teammate", kind: "partner" as const, x: soccerTeammate.x, y: soccerTeammate.y, label: "P", appearAt: 1200 },
  ],
  paths: [
    {
      id: "ladder",
      kind: "ladder",
      points: [{ x: 620, y: 520 }, { x: 760, y: 520 }],
      color: "#dc2626",
      strokeWidth: 3,
      headStyle: "none",
      startAt: 120,
      duration: 550,
    },
    {
      id: "hurdles",
      kind: "hurdles",
      points: [{ x: 620, y: 160 }, { x: 740, y: 160 }],
      color: "#dc2626",
      strokeWidth: 3,
      headStyle: "none",
      startAt: 250,
      duration: 550,
    },
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
      curved: true,
      startAt: 550,
      duration: 2100,
    },
    {
      id: "passLine",
      points: [slalomEnd, soccerTeammate],
      color: soccerPass.color,
      strokeWidth: soccerPass.strokeWidth,
      headStyle: soccerPass.headStyle,
      dash: soccerPass.dash,
      startAt: 2750,
      duration: 550,
    },
  ],
  scriptedDuration: 3300,
};

export const landingShowcaseScenes: ShowcaseScene[] = [
  landingAmericanFootballScene,
  landingBasketballScene,
  landingSoccerScene,
];
