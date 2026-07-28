// Single source of truth for the app's public base URL. Always used for
// shareable/public links (the "Udostępnij" copy value, OG tags) instead of
// window.location.origin or the request host, which can point at a
// Vercel deployment-scoped or branch-preview URL that's behind deployment
// protection and unreachable for a logged-out player opening the link.
const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://coach-zone.vercel.app";

export const SITE_URL = RAW_SITE_URL.replace(/\/+$/, "");

// Builds an absolute, shareable URL for `path` (e.g. "/join/abc123") against
// the app's public base URL. Uses the URL constructor rather than string
// concatenation/slicing: an absolute `path` always resolves against the
// base's origin, so a trailing slash on NEXT_PUBLIC_SITE_URL - present or
// not - can never eat or duplicate a character in the result.
export function siteUrl(path: string): string {
  return new URL(path, RAW_SITE_URL).toString();
}
