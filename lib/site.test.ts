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

describe("toSafeNextPath", () => {
  it("falls back for null (no next param at all)", async () => {
    const { toSafeNextPath } = await loadSite("https://coach-zone.vercel.app");
    expect(toSafeNextPath(null, "/app")).toBe("/app");
  });

  it("falls back for an empty string, not just null/undefined - the ordinary-signup case where {{ .RedirectTo }} renders empty", async () => {
    const { toSafeNextPath } = await loadSite("https://coach-zone.vercel.app");
    expect(toSafeNextPath("", "/app")).toBe("/app");
  });

  it("passes through an ordinary relative path unchanged", async () => {
    const { toSafeNextPath } = await loadSite("https://coach-zone.vercel.app");
    expect(toSafeNextPath("/join/Y7C4sQwBqttW", "/app")).toBe(
      "/join/Y7C4sQwBqttW",
    );
  });

  it("reduces a same-origin absolute URL to its path - what an invite signup's emailRedirectTo produces", async () => {
    const { toSafeNextPath } = await loadSite("https://coach-zone.vercel.app");
    expect(
      toSafeNextPath("https://coach-zone.vercel.app/join/Y7C4sQwBqttW", "/app"),
    ).toBe("/join/Y7C4sQwBqttW");
  });

  it("keeps the query string and hash of a same-origin absolute URL", async () => {
    const { toSafeNextPath } = await loadSite("https://coach-zone.vercel.app");
    expect(
      toSafeNextPath("https://coach-zone.vercel.app/w/abc?ref=x#top", "/app"),
    ).toBe("/w/abc?ref=x#top");
  });

  it("rejects a cross-origin absolute URL rather than redirecting off-site", async () => {
    const { toSafeNextPath } = await loadSite("https://coach-zone.vercel.app");
    expect(toSafeNextPath("https://evil.example/phish", "/app")).toBe("/app");
  });

  it("rejects a protocol-relative URL", async () => {
    const { toSafeNextPath } = await loadSite("https://coach-zone.vercel.app");
    expect(toSafeNextPath("//evil.example/phish", "/app")).toBe("/app");
  });

  it("rejects a backslash-prefixed path (browsers treat it as protocol-relative)", async () => {
    const { toSafeNextPath } = await loadSite("https://coach-zone.vercel.app");
    expect(toSafeNextPath("/\\evil.example", "/app")).toBe("/app");
  });

  it("defaults the fallback to /", async () => {
    const { toSafeNextPath } = await loadSite("https://coach-zone.vercel.app");
    expect(toSafeNextPath(null)).toBe("/");
  });
});
