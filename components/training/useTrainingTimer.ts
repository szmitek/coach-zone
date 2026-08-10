"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { computeTimerTick } from "@/lib/trainingMode";

export type TrainingTimerStatus = "idle" | "running" | "paused" | "completed";

const TICK_MS = 1000;

/**
 * A single block's countdown. Coaches pocket the phone for the whole block,
 * so this cannot drive the display by accumulating setInterval ticks -
 * background tabs throttle or fully suspend timers, which would drift or
 * freeze. Instead it captures an absolute target timestamp on start() and,
 * on every tick (interval or visibilitychange), compares that target
 * against Date.now() via computeTimerTick - correct regardless of how many
 * ticks were actually delivered while hidden.
 *
 * pause() freezes remainingMs and drops the target instead of just halting
 * the interval, so a backgrounded tab has nothing left to recompute while
 * paused. resume() mints a brand-new target from that frozen value rather
 * than shifting the old target by however long the pause lasted - it never
 * needs to know how long the phone was locked for, so pausing and
 * backgrounding can never fight each other.
 *
 * Resets to idle on every new blockKey: the timer never auto-runs, each
 * block needs its own explicit Start tap while the coach sets out cones.
 */
export function useTrainingTimer(
  blockKey: string,
  suggestedDurationMin: number,
  onComplete: () => void,
) {
  const [durationMin, setDurationMin] = useState(suggestedDurationMin);
  const [status, setStatus] = useState<TrainingTimerStatus>("idle");
  const [remainingMs, setRemainingMs] = useState(suggestedDurationMin * 60_000);

  const targetAtRef = useRef<number | null>(null);
  const firedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    setDurationMin(suggestedDurationMin);
    setStatus("idle");
    setRemainingMs(suggestedDurationMin * 60_000);
    targetAtRef.current = null;
    firedRef.current = false;
  }, [blockKey, suggestedDurationMin]);

  const tick = useCallback(() => {
    const targetAt = targetAtRef.current;
    if (targetAt === null) return;
    const { remainingMs: nextRemaining, justCompleted } = computeTimerTick({
      targetAt,
      now: Date.now(),
      alreadyFired: firedRef.current,
    });
    setRemainingMs(nextRemaining);
    if (justCompleted) {
      firedRef.current = true;
      setStatus("completed");
      onCompleteRef.current();
    }
  }, []);

  useEffect(() => {
    if (status !== "running") return;
    const interval = setInterval(tick, TICK_MS);
    function handleVisibilityChange() {
      if (document.visibilityState === "visible") tick();
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [status, tick]);

  const start = useCallback(() => {
    targetAtRef.current = Date.now() + durationMin * 60_000;
    firedRef.current = false;
    setStatus("running");
    // Covers a 0-minute (or already-elapsed) duration: without this, the
    // display would still read the old value until the next interval tick.
    tick();
  }, [durationMin, tick]);

  // Only meaningful while running - callers are expected to gate this on
  // status === "running" the same way the overview screen's tap target does.
  const pause = useCallback(() => {
    if (status !== "running") return;
    const targetAt = targetAtRef.current;
    if (targetAt !== null) {
      const { remainingMs: frozenRemaining } = computeTimerTick({
        targetAt,
        now: Date.now(),
        alreadyFired: firedRef.current,
      });
      setRemainingMs(frozenRemaining);
    }
    targetAtRef.current = null;
    setStatus("paused");
  }, [status]);

  // Only meaningful while paused - callers are expected to gate this on
  // status === "paused" the same way the overview screen's tap target does.
  const resume = useCallback(() => {
    if (status !== "paused") return;
    targetAtRef.current = Date.now() + remainingMs;
    setStatus("running");
  }, [status, remainingMs]);

  // Only meaningful before Start - callers are expected to gate this on
  // status === "idle" the same way the overview screen's tap target does.
  const setMinutes = useCallback((minutes: number) => {
    setDurationMin(minutes);
    setRemainingMs(minutes * 60_000);
  }, []);

  return { status, remainingMs, durationMin, start, pause, resume, setMinutes };
}
