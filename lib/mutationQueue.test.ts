import { describe, expect, it } from "vitest";
import { createMutationQueue } from "./mutationQueue";

function delayedTask(events: string[], label: string, ms: number) {
  return () =>
    new Promise<void>((resolve) => {
      events.push(`${label}:start`);
      setTimeout(() => {
        events.push(`${label}:end`);
        resolve();
      }, ms);
    });
}

describe("createMutationQueue", () => {
  it("runs a slower task to completion before a task queued after it starts", async () => {
    const enqueue = createMutationQueue();
    const events: string[] = [];

    const first = enqueue(delayedTask(events, "a", 20));
    const second = enqueue(delayedTask(events, "b", 5));
    await Promise.all([first, second]);

    // "b" must not start until "a" has fully finished, even though "a" is
    // the slower task - this is exactly what stops a later mutation's
    // version claim from reading a value that an earlier, still-in-flight
    // mutation is about to move on.
    expect(events).toEqual(["a:start", "a:end", "b:start", "b:end"]);
  });

  it("keeps running later tasks after an earlier one rejects", async () => {
    const enqueue = createMutationQueue();
    const events: string[] = [];

    const failing = enqueue(async () => {
      events.push("fail");
      throw new Error("boom");
    });
    const after = enqueue(async () => {
      events.push("after");
    });

    await expect(failing).rejects.toThrow("boom");
    await after;
    expect(events).toEqual(["fail", "after"]);
  });
});
