import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

// Memoized so every caller shares one GoTrueClient instance. Several
// components (see AuthLinkListener) independently check auth state on
// mount, and Supabase's own URL-based session detection is one-shot -
// running it twice from separate client instances races over the same
// one-time recovery/confirmation link.
let client: ReturnType<typeof createBrowserClient<Database>> | undefined;

export function createClient() {
  if (!client) {
    client = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  }
  return client;
}
