import Link from "next/link";
import type { ReactNode } from "react";
import { logout } from "./actions";

const navItems = [
  { href: "/app/exercises", label: "Ćwiczenia" },
  { href: "/app/workouts", label: "Treningi" },
  { href: "/app/calendar", label: "Kalendarz" },
  { href: "/app/settings", label: "Ustawienia" },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <header className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4 sm:gap-8">
            <Link href="/app" className="text-lg font-semibold tracking-tight">
              Coach Zone
            </Link>
            <nav className="flex gap-3 sm:gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-full border border-neutral-300 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900 sm:px-4 sm:py-2"
            >
              Wyloguj się
            </button>
          </form>
        </div>
      </header>

      {children}
    </div>
  );
}
