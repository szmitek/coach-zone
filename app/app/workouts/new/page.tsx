import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { WorkoutBasicsForm } from "@/components/workouts/WorkoutBasicsForm";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nowy trening — Coach Zone",
};

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export default async function NewWorkoutPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  // Middleware already guarantees a user for any /app/* route; this is a
  // defensive fallback since userId below is required for the insert.
  if (!userData.user) {
    redirect("/login");
  }

  const { date } = await searchParams;
  const initialScheduledFor = date && DATE_PATTERN.test(date) ? date : undefined;

  return (
    <main className="mx-auto max-w-2xl px-6 pt-8 pb-20">
      <h1 className="text-3xl font-bold tracking-tight">Nowy trening</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        Podaj podstawowe informacje — szczegóły ćwiczeń dodasz w kolejnym kroku.
      </p>
      <div className="mt-8">
        <WorkoutBasicsForm
          mode="create"
          userId={userData.user.id}
          initialScheduledFor={initialScheduledFor}
        />
      </div>
    </main>
  );
}
