"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { paceScene } from "@/lib/board/showcase/scale";
import type { ShowcaseScene } from "@/lib/board/showcase/types";
import { BoardShowcaseScene } from "./BoardShowcaseScene";

interface Slot {
  key: number;
  sceneIndex: number;
  startedAt: number;
}

export interface BoardShowcaseEngineProps {
  scenes: ShowcaseScene[];
  /** Duration multiplier: >1 slower/calmer, <1 tighter. */
  pace: number;
  /** Extra pause after a scene's choreography finishes, before it starts fading out. */
  holdMs: number;
  /** Crossfade duration between scenes. */
  transitionMs: number;
  loop: boolean;
  showCaptions: boolean;
  className?: string;
}

/**
 * The one shared animation engine behind both the onboarding and landing
 * showcases. Owns the playback clock and the scene sequence/crossfade;
 * everything sport-specific (field, colors, choreography) comes from
 * `scenes`, and everything about pacing/looping/captions comes from props -
 * so the two call sites only differ in what they pass in here.
 */
export function BoardShowcaseEngine({
  scenes,
  pace,
  holdMs,
  transitionMs,
  loop,
  showCaptions,
  className,
}: BoardShowcaseEngineProps) {
  const pacedScenes = useMemo(() => scenes.map((s) => paceScene(s, pace)), [scenes, pace]);

  const [now, setNow] = useState(() => performance.now());
  const [slots, setSlots] = useState<Slot[]>(() => [
    { key: 0, sceneIndex: 0, startedAt: performance.now() },
  ]);
  const [frontKey, setFrontKey] = useState(0);
  // Deliberately separate from frontKey: frontKey flips at the *start* of
  // a crossfade (so the CSS opacity transition has something to animate
  // toward), but swapping the caption text at that same moment made it
  // announce the next sport while the board was still visually showing the
  // previous one for the whole transition. This instead updates once the
  // crossfade has actually finished, alongside the old slot's removal.
  const [captionSceneIndex, setCaptionSceneIndex] = useState(0);
  const nextKeyRef = useRef(1);
  const transitioningRef = useRef(false);
  // Only cleared by the unmount effect below - deliberately *not* tied to
  // the polling effect's own re-runs. That polling effect re-fires every
  // animation frame (it depends on `now`), and a cleanup returned from it
  // would rerun on every one of those frames too - canceling this timeout
  // the instant it was scheduled, before it ever got a chance to fire, and
  // permanently wedging transitioningRef at true after the first swap.
  const pendingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let raf: number;
    const tick = (t: number) => {
      setNow(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    return () => {
      if (pendingTimeoutRef.current) clearTimeout(pendingTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (transitioningRef.current) return;
    const front = slots.find((s) => s.key === frontKey);
    if (!front) return;
    const scene = pacedScenes[front.sceneIndex];
    const elapsed = now - front.startedAt;
    const total = scene.scriptedDuration + holdMs;
    if (elapsed < total) return;

    const atEnd = front.sceneIndex === scenes.length - 1;
    if (atEnd && !loop) return;

    transitioningRef.current = true;
    const nextIndex = (front.sceneIndex + 1) % scenes.length;
    const newKey = nextKeyRef.current++;
    setSlots((prev) => [...prev, { key: newKey, sceneIndex: nextIndex, startedAt: now }]);

    // Let the new slot mount (and paint) at opacity 0 first, so flipping
    // `frontKey` a frame later is what the CSS transition actually
    // animates - flipping in the same tick would skip straight to the end
    // state with no crossfade.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setFrontKey(newKey));
    });

    pendingTimeoutRef.current = setTimeout(() => {
      setSlots((prev) => prev.filter((s) => s.key === newKey));
      setCaptionSceneIndex(nextIndex);
      transitioningRef.current = false;
      pendingTimeoutRef.current = null;
    }, transitionMs + 80);
  }, [now, frontKey, slots, pacedScenes, scenes.length, loop, holdMs, transitionMs]);

  const activeCaption = pacedScenes[captionSceneIndex]?.caption;

  return (
    <div className={`relative ${className ?? ""}`}>
      <div className="relative h-full w-full">
        {slots.map((slot) => (
          <div
            key={slot.key}
            className="absolute inset-0 transition-opacity ease-in-out"
            style={{
              transitionDuration: `${transitionMs}ms`,
              opacity: slot.key === frontKey ? 1 : 0,
            }}
          >
            <BoardShowcaseScene scene={pacedScenes[slot.sceneIndex]} elapsed={now - slot.startedAt} />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex flex-col items-center gap-3 sm:bottom-6">
        {showCaptions && (
          <p
            key={captionSceneIndex}
            className="showcase-caption rounded-full bg-neutral-950/70 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm sm:text-base"
          >
            {activeCaption}
          </p>
        )}
        <div className="flex items-center gap-2">
          {scenes.map((_, i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full transition-colors duration-700"
              style={{
                backgroundColor:
                  i === captionSceneIndex ? "#10b981" : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .showcase-caption {
          animation: showcase-caption-in 500ms ease-out;
        }
        @keyframes showcase-caption-in {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
