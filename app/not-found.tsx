import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Nie znaleziono strony — Coach Zone",
};

export default async function NotFound() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const homeHref = user ? "/app" : "/";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <p className="text-sm font-semibold text-emerald-600">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        Nie znaleziono strony
      </h1>
      <p className="mt-3 max-w-sm text-neutral-600 dark:text-neutral-400">
        Strona, której szukasz, nie istnieje albo została przeniesiona.
      </p>
      <Link
        href={homeHref}
        className="mt-8 inline-block rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
      >
        Strona główna
      </Link>
    </main>
  );
}
