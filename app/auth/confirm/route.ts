import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { toSafeNextPath } from "@/lib/site";

// Meant to be hit by the links in Supabase's "Confirm signup" and "Reset
// Password" email templates, customized per Supabase's docs to point here
// with token_hash/type/next query params instead of the default
// ConfirmationURL. Until every template is switched over, an un-edited
// default template verifies the link against Supabase's own hosted endpoint
// first and redirects back with the session encoded in the URL rather than
// as params here - that leg is handled client-side instead
// (AuthLinkListener + the browser client's automatic detectSessionInUrl).
// This route stays defensive about both the token_hash/type shape and a
// PKCE `code` shape, so nothing else needs to change as templates are
// migrated one at a time.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const code = searchParams.get("code");
  // `next` is either a same-origin absolute URL (an invite signup's
  // emailRedirectTo, echoed back by the email template as
  // {{ .RedirectTo }}) or empty (an ordinary signup, which passes no
  // emailRedirectTo) - see lib/site.ts#toSafeNextPath for why this can't be
  // trusted as-is and can't use `?? fallback` for the empty case.
  const next = toSafeNextPath(
    searchParams.get("next"),
    type === "recovery" ? "/reset-password" : "/app",
  );

  const supabase = await createClient();

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });
    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }
  } else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  const redirectUrl = new URL("/login", request.url);
  redirectUrl.searchParams.set("error", "confirmation_failed");
  return NextResponse.redirect(redirectUrl);
}
