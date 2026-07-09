import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Coach Zone",
};

const navItems = [
  {
    href: "/app/exercises",
    title: "Exercises",
    description: "Browse the official library and build your own drills.",
  },
  {
    href: "/app/workouts",
    title: "Workouts",
    description: "Plan training sessions and share them with your team.",
  },
];

export default async function AppHomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware protects this route, so user is always set here. Fall back
  // defensively in case the profiles row hasn't been created yet.
  const { data: profile } = user
    ? await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .single()
    : { data: null };

  const displayName =
    profile?.display_name ?? user?.email?.split("@")[0] ?? "Coach";

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-lg font-semibold tracking-tight">Coach Zone</span>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
          >
            Log out
          </button>
        </form>
      </header>

      <main className="mx-auto max-w-6xl px-6 pt-8 pb-20">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome, {displayName}
        </h1>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">
          Here&rsquo;s your Coach Zone home base.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-neutral-200 p-6 transition-colors hover:border-emerald-600/50 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
            >
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
