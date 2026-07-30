import { defineConfig, devices } from "@playwright/test";

// Real flows against a real dev server + real Supabase backend - no
// network mocking. See e2e/team-creation.spec.ts for the account
// precondition this suite expects.
const PORT = process.env.E2E_PORT ?? "3100";
const baseURL = process.env.E2E_BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: "list",
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // This container ships a pre-fetched Chromium build outside
        // Playwright's usual cache location (PLAYWRIGHT_BROWSERS_PATH
        // points at it) - pin the binary explicitly so a version mismatch
        // between that build and the installed @playwright/test can't
        // send it looking for a download that network policy would block.
        launchOptions: {
          executablePath:
            process.env.PLAYWRIGHT_CHROMIUM_PATH ?? "/opt/pw-browsers/chromium",
        },
      },
    },
  ],
  // Not started automatically: these flows need NEXT_PUBLIC_SUPABASE_URL/
  // NEXT_PUBLIC_SUPABASE_ANON_KEY pointed at a real project, which is
  // environment-specific. Start `pnpm dev -p $E2E_PORT` yourself first.
  webServer: process.env.E2E_START_SERVER
    ? {
        command: `pnpm dev -p ${PORT}`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      }
    : undefined,
});
