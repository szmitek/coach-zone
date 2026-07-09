"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// Safety net for Supabase's un-edited default email templates (see
// app/auth/confirm/route.ts for the full explanation): confirmation and
// recovery links verify against Supabase's own hosted endpoint and redirect
// back with the session encoded in the URL, which can land on whichever
// page the project's Site URL / redirect_to happens to resolve to. The
// browser client auto-detects and consumes that URL on construction
// (detectSessionInUrl), emitting PASSWORD_RECOVERY or SIGNED_IN - this
// listens for those events from anywhere in the app and routes the user to
// the right screen instead of leaving them stranded wherever the link
// landed.
export function AuthLinkListener() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        router.replace("/reset-password");
      } else if (event === "SIGNED_IN" && window.location.pathname === "/") {
        // Only on the public homepage: a signed-in visitor landing there is
        // almost always a just-confirmed signup, not someone mid-navigation
        // elsewhere in the app (e.g. /login handles its own redirect).
        router.replace("/app");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return null;
}
