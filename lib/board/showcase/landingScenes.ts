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
// American football: "Run & catch", the QB/WR route-and-catch drill from
// the coach's own training plans. A WR lines up facing the QB, sprints
// straight at him, then snaps into a sharp 45-degree break to one side on
// the QB's signal - the QB throws to the break point. One continuous
// sequence, no training equipment: the drill doesn't use a shield, blocker,
// or cones, so none show up here. A second WR queued behind the first runs
// the same rep right after, the way receivers cycle through the line in
// the real drill.
// ---------------------------------------------------------------------------
const afRoute = toolStyle(americanFootballConfig, "route");

const afQb = { x: 560, y: 300 };
const afWr1Start = { x: 860, y: 300 };
const afWr1Break = { x: 680, y: 300 };
const afWr1Catch = { x: 610, y: 370 };
const afWr2Start = { x: 940, y: 300 };
const afWr2Break = { x: 760, y: 300 };
const afWr2Cut = { x: 690, y: 230 };

export const landingAmericanFootballScene: ShowcaseScene = {
  sportSlug: "american_football",
  fieldModeId: "full",
  caption: "Wybiegnięcie z przełamaniem i podanie do WR.",
  markers: [
    { id: "qb", kind: "qb", x: afQb.x, y: afQb.y, label: "QB", appearAt: 0 },
    { id: "wr1", kind: "player", x: afWr1Start.x, y: afWr1Start.y, label: "WR", appearAt: 150 },
    { id: "wr2", kind: "player", x: afWr2Start.x, y: afWr2Start.y, label: "WR", appearAt: 250 },
  ],
  paths: [
    {
      // Straight at the QB, then a decisive polyline break to the side -
      // no `curved` here, so the cut reads as a sharp angle rather than a
      // rounded swerve.
      id: "route1",
      points: [afWr1Start, afWr1Break, afWr1Catch],
      color: afRoute.color,
      strokeWidth: afRoute.strokeWidth,
      headStyle: afRoute.headStyle,
      startAt: 500,
      duration: 1300,
    },
    {
      id: "pass",
      points: [afQb, afWr1Catch],
      color: afRoute.color,
      strokeWidth: afRoute.strokeWidth,
      headStyle: afRoute.headStyle,
      curved: true,
      startAt: 1950,
      duration: 650,
    },
    {
      // Next receiver in line runs the same drill right after the catch,
      // breaking the other way this time.
      id: "route2",
      points: [afWr2Start, afWr2Break, afWr2Cut],
      color: afRoute.color,
      strokeWidth: afRoute.strokeWidth,
      headStyle: afRoute.headStyle,
      startAt: 2750,
      duration: 1300,
    },
  ],
  scriptedDuration: 4050,
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
