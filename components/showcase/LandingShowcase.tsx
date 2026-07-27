"use client";

import { landingShowcaseScenes } from "@/lib/board/showcase/landingScenes";
import { BoardShowcaseEngine } from "./BoardShowcaseEngine";

/**
 * Caption-free, single looping cycle meant to sit inside a landing page
 * hero. Uses its own denser, busier scenes (lib/board/showcase/landingScenes.ts)
 * instead of the onboarding ones - onboarding teaches one tool at a time,
 * this needs to sell in a few seconds, so each scene builds a fuller
 * picture (multiple players, more than one route/action, training
 * equipment) with everything staggered rather than sequential.
 *
 * `overlapRatio` pre-mounts the next scene behind the current one before it
 * hands off, so the loop never visibly resets to an empty field - the same
 * engine onboarding uses, just with that one extra knob turned on. It's a
 * ratio of each scene's own build (see BoardShowcaseEngine's doc comment)
 * rather than a fixed ms count, so all three scenes reveal at the same
 * relative point in their own choreography regardless of how their build
 * time is distributed.
 */
export function LandingShowcase({ className }: { className?: string }) {
  return (
    <BoardShowcaseEngine
      scenes={landingShowcaseScenes}
      pace={0.85}
      holdMs={550}
      transitionMs={500}
      overlapRatio={0.15}
      loop
      showCaptions={false}
      className={className ?? "h-full w-full"}
    />
  );
}
