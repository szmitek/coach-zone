import { afterEach, describe, expect, it, vi } from "vitest";

// site.ts derives SITE_URL/siteUrl from process.env at module-load time, so
// each case stubs the env var and re-imports the (reset) module rather than
// mutating a shared import.
async function loadSite(rawSiteUrl: string) {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", rawSiteUrl);
  return import("./site");
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("siteUrl", () => {
  it("builds the full URL when the base has no trailing slash", async () => {
    const { siteUrl } = await loadSite("https://coach-zone.vercel.app");
    expect(siteUrl("/join/Y7C4sQwBqttW")).toBe(
      "https://coach-zone.vercel.app/join/Y7C4sQwBqttW",
    );
  });

  it("builds the full URL when the base has a trailing slash, without dropping a character", async () => {
    const { siteUrl } = await loadSite("https://coach-zone.vercel.app/");
    expect(siteUrl("/join/Y7C4sQwBqttW")).toBe(
      "https://coach-zone.vercel.app/join/Y7C4sQwBqttW",
    );
  });

  it("is unaffected by a base with multiple trailing slashes", async () => {
    const { siteUrl } = await loadSite("https://coach-zone.vercel.app///");
    expect(siteUrl("/w/abc123")).toBe(
      "https://coach-zone.vercel.app/w/abc123",
    );
  });
});

describe("SITE_URL", () => {
  it("strips a trailing slash for consumers like metadataBase", async () => {
    const { SITE_URL } = await loadSite("https://coach-zone.vercel.app/");
    expect(SITE_URL).toBe("https://coach-zone.vercel.app");
  });
});
