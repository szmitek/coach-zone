import { americanFootballConfig } from "@/lib/board/sports/americanFootball";
import { basketballConfig } from "@/lib/board/sports/basketball";
import { footballConfig } from "@/lib/board/sports/football";
import { toolStyle } from "./scenes";
import type { ShowcaseScene } from "./types";

// Landing-only choreography. Onboarding (scenes.ts / showcaseScenes) builds
// one thing at a time because it's teaching a coach how each tool works -
// this instead composes one coherent drill per sport, with the staggered
// build timing making it feel alive. Density here comes from a single
// continuous action a real coach would run, never from element count: every
// piece of equipment below sits directly on the path the action goes
// through, past, or interacts with, in the order it's used. Nothing is
// dropped onto the field just to look fuller. Same real per-sport tool
// defs/colors as the onboarding scenes - nothing invented, still
// pixel-identical to the live board. This file is only ever imported by
// LandingShowcase.

// ---------------------------------------------------------------------------
// American football: a real passing play, nothing more. A blocker pushes
// through a shield at the snap, two receivers run routes, a defender
// pre-positions on one of them, and the QB reads the coverage and hits the
// receiver left open. No ladder/hurdles/cones - this drill doesn't use any,
// so it doesn't show any.
// ---------------------------------------------------------------------------
const afRoute = toolStyle(americanFootballConfig, "route");
const afBlock = toolStyle(americanFootballConfig, "block");

const afQb = { x: 500, y: 320 };
const afWr1Start = { x: 560, y: 96 };
const afWr1End = { x: 900, y: 236 };
const afWr2Start = { x: 560, y: 430 };
const afWr2End = { x: 780, y: 378 };
const afShield = { x: 430, y: 250 };

export const landingAmericanFootballScene: ShowcaseScene = {
  sportSlug: "american_football",
  fieldModeId: "full",
  caption: "Pełny obraz akcji ofensywnej.",
  markers: [
    { id: "qb", kind: "qb", x: afQb.x, y: afQb.y, label: "QB", appearAt: 0 },
    { id: "shield", kind: "shield", x: afShield.x, y: afShield.y, appearAt: 120 },
    { id: "wr1", kind: "player", x: afWr1Start.x, y: afWr1Start.y, label: "WR", appearAt: 150 },
    { id: "wr2", kind: "player", x: afWr2Start.x, y: afWr2Start.y, label: "WR", appearAt: 150 },
    { id: "defender", kind: "opponent", x: 760, y: 410, appearAt: 480 },
  ],
  paths: [
    {
      id: "block",
      points: [afShield, { x: 480, y: 258 }],
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
// Basketball: one continuous handling sequence - dribble through a cone
// gate, swerve past a defender who's already stepped up, then a pass and a
// catch-and-shoot finish. Every marker sits on the ball's actual route.
// ---------------------------------------------------------------------------
const bbDribble = toolStyle(basketballConfig, "dribble");
const bbShot = toolStyle(basketballConfig, "shot");
const bbPass = toolStyle(basketballConfig, "passLine");

const bbBallStart = { x: 430, y: 270 };
const bbGateA = { x: 560, y: 235 };
const bbGateB = { x: 560, y: 305 };
const bbDefender = { x: 660, y: 270 };
const bbDribbleEnd = { x: 740, y: 250 };
const bbTeammate = { x: 820, y: 320 };
const bbHoop = { x: 866, y: 270 };

export const landingBasketballScene: ShowcaseScene = {
  sportSlug: "basketball",
  fieldModeId: "full",
  caption: "Tak powstaje cała akcja pod koszem.",
  markers: [
    { id: "player", kind: "player", x: bbBallStart.x, y: bbBallStart.y, appearAt: 0 },
    { id: "cone-a", kind: "cone", x: bbGateA.x, y: bbGateA.y, appearAt: 60 },
    { id: "cone-b", kind: "cone", x: bbGateB.x, y: bbGateB.y, appearAt: 110 },
    { id: "defender", kind: "opponent", x: bbDefender.x, y: bbDefender.y, appearAt: 350 },
    { id: "teammate", kind: "partner", x: bbTeammate.x, y: bbTeammate.y, label: "P", appearAt: 1350 },
  ],
  paths: [
    {
      // Straight into the gate between the two cones, then swerves above
      // the defender's spot before settling back down - the dribble tool's
      // own wavy render sells the change of pace.
      id: "dribble",
      points: [bbBallStart, { x: bbGateA.x, y: 270 }, { x: bbDefender.x, y: 220 }, bbDribbleEnd],
      color: bbDribble.color,
      strokeWidth: bbDribble.strokeWidth,
      headStyle: bbDribble.headStyle,
      wavy: true,
      startAt: 200,
      duration: 1500,
    },
    {
      id: "passLine",
      points: [bbDribbleEnd, bbTeammate],
      color: bbPass.color,
      strokeWidth: bbPass.strokeWidth,
      headStyle: bbPass.headStyle,
      dash: bbPass.dash,
      startAt: 1700,
      duration: 550,
    },
    {
      id: "shot",
      points: [bbTeammate, bbHoop],
      color: bbShot.color,
      strokeWidth: bbShot.strokeWidth,
      headStyle: bbShot.headStyle,
      curved: true,
      startAt: 2250,
      duration: 900,
    },
  ],
  scriptedDuration: 3150,
};

// ---------------------------------------------------------------------------
// Soccer: one agility lane, start to finish - the ladder, then the cone
// slalom, then a defender beaten, then the pass. The run path is a single
// route that physically passes over the ladder rungs and between every
// cone, in that order, before swerving past the defender.
// ---------------------------------------------------------------------------
const soccerMove = toolStyle(footballConfig, "movement");
const soccerPass = toolStyle(footballConfig, "passLine");

const soccerStart = { x: 340, y: 340 };
const ladderEnd = { x: 480, y: 340 };
const slalomCones = [
  { x: 540, y: 340 },
  { x: 610, y: 340 },
  { x: 680, y: 340 },
  { x: 750, y: 340 },
];
const slalomExit = { x: 810, y: 340 };
const soccerDefender = { x: 860, y: 340 };
const pastDefender = { x: 910, y: 340 };
const soccerTeammate = { x: 960, y: 260 };

export const landingSoccerScene: ShowcaseScene = {
  sportSlug: "football",
  fieldModeId: "full",
  caption: "Cały tor zwinnościowy w akcji.",
  markers: [
    { id: "player", kind: "player", x: soccerStart.x, y: soccerStart.y, appearAt: 0 },
    ...slalomCones.map((c, i) => ({
      id: `cone-${i}`,
      kind: "cone" as const,
      x: c.x,
      y: c.y,
      appearAt: 600 + i * 90,
    })),
    { id: "defender", kind: "opponent" as const, x: soccerDefender.x, y: soccerDefender.y, appearAt: 1600 },
    { id: "teammate", kind: "partner" as const, x: soccerTeammate.x, y: soccerTeammate.y, label: "P", appearAt: 2400 },
  ],
  paths: [
    {
      id: "ladder",
      kind: "ladder",
      points: [soccerStart, ladderEnd],
      color: "#dc2626",
      strokeWidth: 3,
      headStyle: "none",
      startAt: 100,
      duration: 500,
    },
    {
      // Same start point as the ladder equipment above - the run traces
      // straight over its rungs, then into the slalom weave between every
      // cone, then swerves past the defender before the path ends where the
      // pass picks up.
      id: "run",
      points: [
        soccerStart,
        ladderEnd,
        { x: slalomCones[0].x, y: 296 },
        { x: slalomCones[1].x, y: 384 },
        { x: slalomCones[2].x, y: 296 },
        { x: slalomCones[3].x, y: 384 },
        slalomExit,
        { x: soccerDefender.x, y: 290 },
        pastDefender,
      ],
      color: soccerMove.color,
      strokeWidth: soccerMove.strokeWidth,
      headStyle: soccerMove.headStyle,
      curved: true,
      startAt: 650,
      duration: 2200,
    },
    {
      id: "passLine",
      points: [pastDefender, soccerTeammate],
      color: soccerPass.color,
      strokeWidth: soccerPass.strokeWidth,
      headStyle: soccerPass.headStyle,
      dash: soccerPass.dash,
      startAt: 2850,
      duration: 550,
    },
  ],
  scriptedDuration: 3400,
};

export const landingShowcaseScenes: ShowcaseScene[] = [
  landingAmericanFootballScene,
  landingBasketballScene,
  landingSoccerScene,
];
