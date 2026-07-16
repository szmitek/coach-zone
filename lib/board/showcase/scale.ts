import type { ShowcaseScene } from "./types";

/**
 * Scales every timing in a scene by `pace` (>1 = slower/calmer, <1 =
 * tighter) without touching positions, colors, or any other authored
 * detail - lets the onboarding and landing variants share one choreography
 * while moving at different speeds.
 */
export function paceScene(scene: ShowcaseScene, pace: number): ShowcaseScene {
  return {
    ...scene,
    markers: scene.markers.map((m) => ({ ...m, appearAt: m.appearAt * pace })),
    paths: scene.paths.map((p) => ({
      ...p,
      startAt: p.startAt * pace,
      duration: p.duration * pace,
    })),
    scriptedDuration: scene.scriptedDuration * pace,
  };
}
