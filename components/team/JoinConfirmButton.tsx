"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { FormBanner } from "@/components/auth/FormBanner";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { createClient } from "@/lib/supabase/client";
import type { JoinTeamResult } from "@/lib/supabase/types";

// "this link expired" and "this link never existed" mean very different
// things to the person holding it - one message per reason, no generic
// catch-all for the structured {ok: false, reason} responses.
const REASON_MESSAGES: Record<
  Extract<JoinTeamResult, { ok: false }>["reason"],
  string
> = {
  not_found:
    "Ten link zaproszenia nie istnieje. Sprawdź, czy skopiowałeś go w całości.",
  expired: "To zaproszenie wygasło. Poproś head coacha o nowy link.",
  revoked: "To zaproszenie zostało odwołane. Poproś head coacha o nowy link.",
  not_authenticated:
    "Twoja sesja wygasła. Zaloguj się ponownie i spróbuj jeszcze raz.",
};

export function JoinConfirmButton({ token }: { token: string }) {
  const [joining, setJoining] = useState(false);
  const [result, setResult] = useState<JoinTeamResult | null>(null);
  // Kept separate from `result`: a transport/RPC failure isn't any of the
  // four structured reasons join_team_with_token itself returns.
  const [genericError, setGenericError] = useState(false);

  async function handleJoin(event: FormEvent) {
    event.preventDefault();
    setJoining(true);
    setGenericError(false);

    const supabase = createClient();
    const { data, error } = await supabase.rpc("join_team_with_token", {
      p_token: token,
    });

    setJoining(false);
    if (error || !data) {
      setGenericError(true);
      return;
    }
    setResult(data);
  }

  if (result?.ok) {
    // Joining twice is a no-op by design (ON CONFLICT DO NOTHING) and
    // reports ok: true either way - one success message covers both.
    return (
      <div className="space-y-4 text-center">
        <FormBanner variant="success" message="Dołączyłeś do drużyny." />
        <Link
          href="/app/team"
          className="inline-block text-sm font-medium text-emerald-600 hover:text-emerald-500"
        >
          Przejdź do drużyny
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleJoin} className="space-y-4">
      <FormBanner
        variant="error"
        message={
          genericError
            ? "Nie udało się dołączyć do drużyny. Spróbuj ponownie."
            : result && !result.ok
              ? REASON_MESSAGES[result.reason]
              : null
        }
      />
      <SubmitButton loading={joining} loadingText="Dołączanie…">
        Dołącz do drużyny
      </SubmitButton>
    </form>
  );
}
