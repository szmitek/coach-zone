"use client";

import { showcaseScenes } from "@/lib/board/showcase/scenes";
import { BoardShowcaseEngine } from "./BoardShowcaseEngine";

/**
 * Tighter, caption-free, single looping cycle meant to sit inside a landing
 * page hero - not wired into any page yet (that's a future round), but the
 * engine underneath is the exact same one the onboarding variant uses.
 */
export function LandingShowcase({ className }: { className?: string }) {
  return (
    <BoardShowcaseEngine
      scenes={showcaseScenes}
      pace={0.85}
      holdMs={550}
      transitionMs={500}
      loop
      showCaptions={false}
      className={className ?? "h-full w-full"}
    />
  );
}
