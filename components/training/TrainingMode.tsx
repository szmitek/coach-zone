"use client";

import Link from "next/link";
import { useState } from "react";
import type { TrainingPlan } from "@/lib/trainingMode";
import { TrainingCompleteScreen } from "./TrainingCompleteScreen";
import { TrainingGroupDetailScreen } from "./TrainingGroupDetailScreen";
import { TrainingOverviewScreen } from "./TrainingOverviewScreen";

// Read-only playback shell for running a workout on the field - it walks
// `plan` (built server-side by buildTrainingPlan) in order and never writes
// anything back. Single-coach, single-phone: no realtime, no persistence,
// no shared state - closing the tab just means starting over from section 1.
export function TrainingMode({
  workoutId,
  workoutTitle,
  plan,
}: {
  workoutId: string;
  workoutTitle: string;
  plan: TrainingPlan;
}) {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [blockIndex, setBlockIndex] = useState(0);
  const [openGroupKey, setOpenGroupKey] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  if (plan.length === 0) {
    return (
      <div className="fixed inset-x-0 top-0 z-50 flex h-dvh flex-col items-center justify-center gap-4 bg-neutral-950 px-6 text-center text-white">
        <h1 className="text-2xl font-bold tracking-tight text-balance">
          {workoutTitle}
        </h1>
        <p className="text-neutral-400">
          Ten trening nie ma jeszcze żadnych ćwiczeń do przećwiczenia.
        </p>
        <Link
          href={`/app/workouts/${workoutId}`}
          className="mt-2 rounded-full bg-emerald-500 px-6 py-3 text-lg font-bold text-neutral-950 transition-colors active:bg-emerald-400"
        >
          Powrót do treningu
        </Link>
      </div>
    );
  }

  if (finished) {
    return (
      <TrainingCompleteScreen
        workoutId={workoutId}
        workoutTitle={workoutTitle}
      />
    );
  }

  const section = plan[sectionIndex];
  const block = section.blocks[blockIndex];
  const openGroup =
    block.groups.find((group) => group.key === openGroupKey) ?? null;

  function handleNext() {
    setOpenGroupKey(null);
    if (blockIndex < section.blocks.length - 1) {
      setBlockIndex((i) => i + 1);
      return;
    }
    if (sectionIndex < plan.length - 1) {
      setSectionIndex((i) => i + 1);
      setBlockIndex(0);
      return;
    }
    setFinished(true);
  }

  if (openGroup) {
    return (
      <TrainingGroupDetailScreen
        group={openGroup}
        onBack={() => setOpenGroupKey(null)}
      />
    );
  }

  return (
    <TrainingOverviewScreen
      workoutId={workoutId}
      section={section}
      sectionIndex={sectionIndex}
      totalSections={plan.length}
      block={block}
      blockIndex={blockIndex}
      totalBlocks={section.blocks.length}
      blockKey={`${sectionIndex}-${blockIndex}`}
      onOpenGroup={setOpenGroupKey}
      onNext={handleNext}
    />
  );
}
