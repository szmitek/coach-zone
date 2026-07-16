"use client";

import { showcaseScenes } from "@/lib/board/showcase/scenes";
import { BoardShowcaseEngine } from "./BoardShowcaseEngine";

/**
 * Full-screen, calm-paced variant with captions - shown once, right after
 * signup. Slower than the landing loop and holds a beat longer on each
 * sport so a coach can actually read the caption before it moves on.
 */
export function OnboardingShowcase({ className }: { className?: string }) {
  return (
    <BoardShowcaseEngine
      scenes={showcaseScenes}
      pace={1.15}
      holdMs={1500}
      transitionMs={750}
      loop
      showCaptions
      className={className ?? "h-full w-full"}
    />
  );
}
