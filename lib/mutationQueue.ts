// Chains async tasks onto a single tail so overlapping callers never
// interleave: task N+1 doesn't start until task N has fully settled, success
// or failure. Used by WorkoutBuilder to serialize its claim-write-resync
// sequences - without this, a second edit queued (or fired) before the
// first's resync lands can claim workouts.updated_at using a value that's
// already stale by the time its own claim reaches the server, reporting a
// conflict against no one but the same coach's own prior save.
export function createMutationQueue() {
  let tail: Promise<void> = Promise.resolve();
  return function enqueue(task: () => Promise<void>): Promise<void> {
    const run = tail.then(task, task);
    tail = run.catch(() => {});
    return run;
  };
}
