import type { Metadata } from "next";
import Link from "next/link";
import { cache } from "react";
import { SharedWorkoutView } from "@/components/workouts/SharedWorkoutView";
import { createClient } from "@/lib/supabase/server";

// Public route (outside /app) - no auth, read-only. Data comes exclusively
// through the get_shared_workout() security-definer RPC, which is the only
// thing granted to anon; there is no direct table access to fall back to.
export const dynamic = "force-dynamic";

// Deduped so generateMetadata and the page body share one RPC call per request.
const getSharedWorkout = cache(async (shareId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_shared_workout", {
    p_share_id: shareId,
  });
  return { payload: data, error };
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ share_id: string }>;
}): Promise<Metadata> {
  const { share_id } = await params;
  const { payload } = await getSharedWorkout(share_id);

  if (!payload) {
    return { title: "Nie znaleziono treningu — Coach Zone" };
  }

  const title = `${payload.workout.title} — Coach Zone`;
  const url = `/w/${share_id}`;
  return {
    title,
    alternates: { canonical: url },
    openGraph: { title, type: "website", url },
  };
}

export default async function SharedWorkoutPage({
  params,
}: {
  params: Promise<{ share_id: string }>;
}) {
  const { share_id } = await params;
  const { payload, error } = await getSharedWorkout(share_id);

  if (!payload) {
    return (
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {error ? "Wystąpił błąd" : "Nie znaleziono treningu"}
        </h1>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">
          {error
            ? "Nie udało się wczytać treningu. Spróbuj ponownie."
            : "Ten link jest nieprawidłowy albo trening został usunięty."}
        </p>
        <Link
          href={error ? `/w/${share_id}` : "/"}
          className="mt-6 inline-block rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
        >
          {error ? "Spróbuj ponownie" : "Strona główna"}
        </Link>
      </main>
    );
  }

  return <SharedWorkoutView payload={payload} />;
}
