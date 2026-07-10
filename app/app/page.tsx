import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Coach Zone",
};

const navItems = [
  {
    href: "/app/exercises",
    title: "Ćwiczenia",
    description: "Przeglądaj oficjalną bibliotekę i twórz własne ćwiczenia.",
  },
  {
    href: "/app/workouts",
    title: "Treningi",
    description: "Planuj sesje treningowe i buduj je z biblioteki ćwiczeń.",
  },
  {
    href: "/app/calendar",
    title: "Kalendarz",
    description: "Zobacz treningi w widoku tygodnia i planuj mikrocykle.",
  },
  {
    href: "/app/board",
    title: "Tablica taktyczna",
    description:
      "Rysuj ustawienia i akcje na boisku (wersja robocza, bez zapisywania).",
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
    <main className="mx-auto max-w-3xl px-6 pt-8 pb-20">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Witaj, {displayName}
      </h1>
      <p className="mt-3 text-neutral-600 dark:text-neutral-400">
        To Twoja strona startowa w Coach Zone.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
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
  );
}
