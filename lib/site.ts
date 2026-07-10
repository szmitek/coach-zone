// Single source of truth for the app's public base URL. Always used for
// shareable/public links (the "Udostępnij" copy value, OG tags) instead of
// window.location.origin or the request host, which can point at a
// Vercel deployment-scoped or branch-preview URL that's behind deployment
// protection and unreachable for a logged-out player opening the link.
const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://coach-zone.vercel.app";

export const SITE_URL = RAW_SITE_URL.replace(/\/+$/, "");
