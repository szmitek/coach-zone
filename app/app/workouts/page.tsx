import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Workouts — Coach Zone",
};

export default function WorkoutsPlaceholder() {
  return (
    <div className="flex min-h-[calc(100vh-65px)] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">
        Workouts are coming in Round 4
      </h1>
      <p className="mt-3 max-w-sm text-neutral-600 dark:text-neutral-400">
        This is where you&rsquo;ll assemble training sessions and share them
        with your team.
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
