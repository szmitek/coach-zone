import type { Metadata } from "next";
import { TacticsBoardLoader } from "@/components/board/TacticsBoardLoader";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tablica taktyczna — Coach Zone",
};

export default async function BoardPage() {
  const supabase = await createClient();
  const { data: sports } = await supabase
    .from("sports")
    .select("*")
    .order("id", { ascending: true });

  return (
    <main className="mx-auto max-w-4xl px-4 pt-8 pb-20 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Tablica taktyczna</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        Rysuj ustawienia i akcje na boisku. Wersja robocza — bez zapisywania i
        eksportu (dołączymy je w kolejnym etapie).
      </p>
      <div className="mt-6">
        <TacticsBoardLoader sports={sports ?? []} />
      </div>
    </main>
  );
}
