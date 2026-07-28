import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { JoinConfirmButton } from "@/components/team/JoinConfirmButton";
import { createClient } from "@/lib/supabase/server";

// Public route (outside /app) - deliberately not behind the auth redirect in
// middleware.ts (isProtectedPath only matches /app and /app/*), so a
// signed-out visitor lands here and gets prompted to log in/register first,
// rather than being bounced to a bare /login with no memory of the invite.
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
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    return (
      <AuthShell
        title="Zaproszenie do drużyny"
        subtitle="Dołączanie wymaga konta, aby head coach wiedział dokładnie, kto dołączył. Zaloguj się lub załóż konto, aby zobaczyć szczegóły tego zaproszenia."
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

  // Granted to `authenticated` only (not anon) - deliberate, so even seeing
  // which team a token belongs to requires an identified account, same
  // reasoning the RPC comment gives for joining itself.
  const { data: preview, error } = await supabase.rpc("get_invite_preview", {
    p_token: token,
  });

  if (error || !preview) {
    return (
      <AuthShell
        title="Nie znaleziono zaproszenia"
        subtitle="Ten link jest nieprawidłowy albo zaproszenie zostało usunięte."
      >
        <Link
          href="/app"
          className="block text-center text-sm font-medium text-emerald-600 hover:text-emerald-500"
        >
          Przejdź do aplikacji
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Zaproszenie do drużyny"
      subtitle={
        preview.valid
          ? `Zostałeś zaproszony do drużyny „${preview.team_name}” (${preview.short_name}).`
          : `Zaproszenie do drużyny „${preview.team_name}” (${preview.short_name}) jest już nieaktywne.`
      }
    >
      {preview.valid ? (
        <JoinConfirmButton token={token} />
      ) : (
        <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
          To zaproszenie wygasło lub zostało odwołane. Poproś head coacha o
          nowy link.
        </p>
      )}
    </AuthShell>
  );
}
