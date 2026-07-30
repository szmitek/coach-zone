import { expect, test, type Page } from "@playwright/test";

// Walks the real "+ Utwórz drużynę" flow end to end against a real dev
// server and a real Supabase backend - no route mocking. This exists
// because the previous verification pass screenshotted the switcher's
// component states (dropdown open, dashed affordance, etc.) without ever
// clicking through to see where the link actually landed, which is exactly
// how #44 shipped a "+ Utwórz drużynę" that dead-ended on a coach's own
// roster. Every assertion here is about where a click lands or what the
// header shows afterward, not just what renders in isolation.
//
// Requires E2E_TEST_EMAIL / E2E_TEST_PASSWORD for a confirmed account that
// owns zero teams when this spec starts - the first step depends on the
// real "no team" empty state, so it can't be faked with a throwaway name.
// The account owns two teams ("E2E Team One" / "E2E Team Two") by the end
// of a successful run; there is no delete-team affordance in the product
// to reset it, so re-runs need a fresh account (or a manual DB cleanup).
//
// Start the app first (`E2E_START_SERVER=1 pnpm exec playwright test`, or
// run `pnpm dev` yourself and point E2E_BASE_URL/E2E_PORT at it).

const EMAIL = process.env.E2E_TEST_EMAIL;
const PASSWORD = process.env.E2E_TEST_PASSWORD;

test.skip(
  !EMAIL || !PASSWORD,
  "E2E_TEST_EMAIL / E2E_TEST_PASSWORD not set - see file header for the account this spec expects.",
);

const TEAM_ONE = { name: "E2E Team One", shortName: "E2E1" };
const TEAM_TWO = { name: "E2E Team Two", shortName: "E2E2" };

async function login(page: Page) {
  await page.goto("/login");
  await page.getByLabel("Adres e-mail").fill(EMAIL!);
  await page.getByLabel("Hasło").fill(PASSWORD!);
  await page.getByRole("button", { name: "Zaloguj się" }).click();
  await page.waitForURL(/\/app(\/.*)?$/);

  // Fresh accounts get a full-screen first-login overlay that would
  // otherwise sit on top of the header and swallow every click below.
  const skipOnboarding = page.getByRole("button", { name: "Pomiń" });
  if (await skipOnboarding.isVisible().catch(() => false)) {
    await skipOnboarding.click();
  }
}

// The switcher's toggle button carries a state-dependent aria-label
// ("Wybierz drużynę" vs "Aktywna drużyna: X"), so target it by the
// attribute that doesn't change instead.
function switcherToggle(page: Page) {
  return page.locator('button[aria-haspopup="true"]');
}

async function fillCreateForm(
  page: Page,
  team: { name: string; shortName: string },
) {
  await expect(page).toHaveURL(/\/app\/team\/new$/);
  await page.getByLabel("Pełna nazwa drużyny").fill(team.name);
  await page.getByLabel(/Skrót/).fill(team.shortName);
  await page.getByRole("button", { name: "Utwórz drużynę" }).click();
}

test.describe.serial("team creation is reachable and functional from every switcher state", () => {
  test("zero teams → one team → two teams, all via the switcher", async ({
    page,
  }) => {
    await login(page);

    await test.step("/app/team on its own offers a create affordance at zero teams", async () => {
      await page.goto("/app/team");
      await expect(
        page.getByText("Nie masz jeszcze żadnej drużyny"),
      ).toBeVisible();
      const link = page.getByRole("link", { name: /Załóż pierwszą drużynę/ });
      await expect(link).toHaveAttribute("href", "/app/team/new");
    });

    await test.step("dropdown's create affordance at zero teams reaches the create form", async () => {
      await page.goto("/app");
      await page.getByRole("link", { name: "Utwórz drużynę" }).click();
      await expect(page).toHaveURL(/\/app\/team\/new$/);
    });

    await test.step("completing the form activates the team and lands on /app/team", async () => {
      await fillCreateForm(page, TEAM_ONE);
      await expect(page).toHaveURL(/\/app\/team$/);
      await expect(switcherToggle(page)).toHaveAttribute(
        "aria-label",
        `Aktywna drużyna: ${TEAM_ONE.name}`,
      );
      await expect(switcherToggle(page)).toContainText(TEAM_ONE.shortName);
    });

    await test.step("reopening the dropdown lists the one team just created", async () => {
      await switcherToggle(page).click();
      await expect(
        page.getByRole("button", { name: new RegExp(TEAM_ONE.name) }),
      ).toBeVisible();
      // This is the exact bug from #44: with >=1 team the switcher renders
      // a dropdown instead of the dashed affordance, and its own
      // "+ Utwórz drużynę" item pointed at /app/team, which for a coach who
      // already has a team shows the roster, not a create form.
      const dropdownCreateLink = page.getByRole("link", {
        name: "+ Utwórz drużynę",
      });
      await expect(dropdownCreateLink).toHaveAttribute(
        "href",
        "/app/team/new",
      );
    });

    await test.step("/app/team also offers a create affordance once a team exists", async () => {
      await page.goto("/app/team");
      await expect(page.getByText(TEAM_ONE.name)).toBeVisible();
      const link = page.getByRole("link", { name: "+ Nowa drużyna" });
      await expect(link).toHaveAttribute("href", "/app/team/new");
    });

    await test.step("clicking create from the dropdown with one team reaches the create form, not the roster", async () => {
      await switcherToggle(page).click();
      await page.getByRole("link", { name: "+ Utwórz drużynę" }).click();
      await expect(page).toHaveURL(/\/app\/team\/new$/);
    });

    await test.step("completing the form again activates the second team", async () => {
      await fillCreateForm(page, TEAM_TWO);
      await expect(page).toHaveURL(/\/app\/team$/);
      await expect(switcherToggle(page)).toHaveAttribute(
        "aria-label",
        `Aktywna drużyna: ${TEAM_TWO.name}`,
      );
      await expect(switcherToggle(page)).toContainText(TEAM_TWO.shortName);
    });

    await test.step("reopening the dropdown lists both teams and switching between them works", async () => {
      await switcherToggle(page).click();
      const rowOne = page.getByRole("button", {
        name: new RegExp(TEAM_ONE.name),
      });
      const rowTwo = page.getByRole("button", {
        name: new RegExp(TEAM_TWO.name),
      });
      await expect(rowOne).toBeVisible();
      await expect(rowTwo).toBeVisible();

      await rowOne.click();
      await expect(page.getByRole("status")).toContainText(
        `Przełączono na ${TEAM_ONE.shortName}`,
      );
      await expect(switcherToggle(page)).toHaveAttribute(
        "aria-label",
        `Aktywna drużyna: ${TEAM_ONE.name}`,
      );
    });
  });
});
