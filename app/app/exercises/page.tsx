import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Exercises — Coach Zone",
};

export default function ExercisesPlaceholder() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <h1 className="text-2xl font-semibold tracking-tight">
        Exercises are coming in Round 3
      </h1>
      <p className="mt-3 max-w-sm text-neutral-600 dark:text-neutral-400">
        This is where you&rsquo;ll browse the official exercise library and
        build your own drills.
      </p>
      <Link
        href="/app"
        className="mt-8 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
      >
        Back to home
      </Link>
    </div>
  );
}
