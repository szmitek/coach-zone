// Single source of truth for the app's public base URL. Always used for
// shareable/public links (the "Udostępnij" copy value, OG tags) instead of
// window.location.origin or the request host, which can point at a
// Vercel deployment-scoped or branch-preview URL that's behind deployment
// protection and unreachable for a logged-out player opening the link.
const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://coach-zone.vercel.app";

export const SITE_URL = RAW_SITE_URL.replace(/\/+$/, "");

const SITE_ORIGIN = new URL(RAW_SITE_URL).origin;

// Builds an absolute, shareable URL for `path` (e.g. "/join/abc123") against
// the app's public base URL. Uses the URL constructor rather than string
// concatenation/slicing: an absolute `path` always resolves against the
// base's origin, so a trailing slash on NEXT_PUBLIC_SITE_URL - present or
// not - can never eat or duplicate a character in the result.
export function siteUrl(path: string): string {
  return new URL(path, RAW_SITE_URL).toString();
}

// Validates an untrusted `next` redirect target - e.g. the `next` query
// param on /auth/confirm, which echoes back whatever emailRedirectTo was
// passed to supabase.auth.signUp (rendered by the email template via
// {{ .RedirectTo }}). That makes it attacker-reachable: someone can hand
// out a confirmation link with next set to an absolute URL on another
// origin. Accepts a same-origin absolute URL (what emailRedirectTo/siteUrl
// produces) or an ordinary relative path, and reduces either to a path safe
// to redirect to. A protocol-relative "//host" or "/\host" path, a
// different origin, or missing/empty input (an ordinary signup passes no
// emailRedirectTo at all, so {{ .RedirectTo }} renders as "") all fall back
// instead of leaving the site.
export function toSafeNextPath(
  next: string | null | undefined,
  fallback = "/",
): string {
  if (!next) return fallback;

  if (
    next.startsWith("/") &&
    !next.startsWith("//") &&
    !next.startsWith("/\\")
  ) {
    return next;
  }

  try {
    const url = new URL(next);
    if (url.origin === SITE_ORIGIN) {
      return `${url.pathname}${url.search}${url.hash}`;
    }
  } catch {
    // Not a parseable absolute URL either.
  }

  return fallback;
}
