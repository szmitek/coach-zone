import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { JoinConfirmButton } from "@/components/team/JoinConfirmButton";
import { createClient } from "@/lib/supabase/server";

// Public route (outside /app) - deliberately not behind the auth redirect in
// middleware.ts (isProtectedPath only matches /app and /app/*), so a
// signed-out visitor lands here and sees which team this is for before
// being asked to do anything.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dołącz do drużyny — Coach Zone",
};

export default async function JoinPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const returnTo = `/join/${token}`;

  const supabase = await createClient();
  // get_invite_preview is granted to anon too, not just authenticated (see
  // supabase/migrations/20260728141752_grant_invite_preview_to_anon.sql):
  // an invited person should see which team they're being invited to
  // *before* deciding whether to create an account - "join Husaria
  // Szczecin's staff" is a much stronger prompt than "log in to find out
  // what this is". Security is unchanged: the token carries ~72 bits of
  // entropy and this returns only team_name, short_name, and a validity
  // flag - same model as get_shared_workout(), which anon can already call.
  const [{ data: userData }, { data: preview, error }] = await Promise.all([
    supabase.auth.getUser(),
    supabase.rpc("get_invite_preview", { p_token: token }),
  ]);

  if (error || !preview) {
    return (
      <AuthShell
        title="Nie znaleziono zaproszenia"
        subtitle="Ten link jest nieprawidłowy albo zaproszenie zostało usunięte."
      >
        <Link
          href="/"
          className="block text-center text-sm font-medium text-emerald-600 hover:text-emerald-500"
        >
          Strona główna
        </Link>
      </AuthShell>
    );
  }

  const teamTitle = `${preview.team_name} (${preview.short_name})`;

  // Dead regardless of who's looking at it - say so plainly rather than
  // sending anyone off to log in or register for nothing.
  if (!preview.valid) {
    return (
      <AuthShell
        title={teamTitle}
        subtitle="To zaproszenie do sztabu szkoleniowego wygasło lub zostało odwołane."
      >
        <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
          Poproś head coacha o nowy link zaproszenia.
        </p>
      </AuthShell>
    );
  }

  if (!userData.user) {
    return (
      <AuthShell
        title={teamTitle}
        subtitle="Zaprasza Cię do sztabu szkoleniowego. Aby dołączyć, zaloguj się lub załóż konto — dzięki temu head coach widzi dokładnie, kto dołączył."
      >
        <div className="flex flex-col gap-3">
          <Link
            href={`/login?next=${encodeURIComponent(returnTo)}`}
            className="w-full rounded-full bg-emerald-600 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-emerald-500"
          >
            Zaloguj się
          </Link>
          <Link
            href={`/signup?next=${encodeURIComponent(returnTo)}`}
            className="w-full rounded-full border border-neutral-300 px-4 py-2.5 text-center text-sm font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
          >
            Zarejestruj się
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title={teamTitle}
      subtitle="Zaprasza Cię do sztabu szkoleniowego."
    >
      <JoinConfirmButton token={token} />
    </AuthShell>
  );
}
