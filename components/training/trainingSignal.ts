"use client";

// The coach-facing whistle: a short beep pattern plus a vibration buzz
// where supported. Fires when a block's timer hits 00:00.
//
// Autoplay policies block a *new* AudioContext (or a suspended one) from
// making sound unless it's created/resumed inside a user gesture. The timer
// completion fires later from a setInterval/visibilitychange callback,
// which is never itself a gesture - so armTrainingSignal() must be called
// from the Start tap handler to create (or resume) the shared context while
// there's still a real gesture on the stack, and fireTrainingSignal() just
// reuses whatever that produced.
let sharedAudioContext: AudioContext | null = null;

function getAudioContextConstructor(): typeof AudioContext | null {
  if (typeof window === "undefined") return null;
  const withWebkit = window as typeof window & {
    webkitAudioContext?: typeof AudioContext;
  };
  return window.AudioContext ?? withWebkit.webkitAudioContext ?? null;
}

export function armTrainingSignal(): void {
  const Ctor = getAudioContextConstructor();
  if (!Ctor) return;
  if (!sharedAudioContext) {
    sharedAudioContext = new Ctor();
  }
  if (sharedAudioContext.state === "suspended") {
    void sharedAudioContext.resume();
  }
}

function beep(
  ctx: AudioContext,
  startTime: number,
  frequency: number,
  duration: number,
) {
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = "square";
  oscillator.frequency.value = frequency;
  // Short envelope instead of a hard on/off, so the beep doesn't click.
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(0.35, startTime + 0.02);
  gain.gain.setValueAtTime(0.35, startTime + duration - 0.03);
  gain.gain.linearRampToValueAtTime(0, startTime + duration);
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
}

export function fireTrainingSignal(): void {
  const ctx = sharedAudioContext;
  if (ctx) {
    if (ctx.state === "suspended") void ctx.resume();
    const now = ctx.currentTime;
    beep(ctx, now, 880, 0.18);
    beep(ctx, now + 0.24, 880, 0.18);
    beep(ctx, now + 0.48, 880, 0.32);
  }

  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate([200, 100, 200, 100, 400]);
  }
}
