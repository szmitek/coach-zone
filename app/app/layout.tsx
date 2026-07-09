import Link from "next/link";
import type { ReactNode } from "react";
import { logout } from "./actions";

const navItems = [
  { href: "/app/exercises", label: "Exercises" },
  { href: "/app/workouts", label: "Workouts" },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <header className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6 sm:gap-8">
            <Link href="/app" className="text-lg font-semibold tracking-tight">
              Coach Zone
            </Link>
            <nav className="flex gap-4 sm:gap-6">
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
              className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
            >
              Log out
            </button>
          </form>
        </div>
      </header>

      {children}
    </div>
  );
}
