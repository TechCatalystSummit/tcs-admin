import { test, expect } from "@playwright/test";

const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL ?? "admin1@tcs.dev";
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? "TcsDev2026!";

test.describe("Events", () => {
  test.skip(
    !process.env.NEXT_PUBLIC_SUPABASE_URL,
    "Requires Supabase env and running tcs-api",
  );

  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email address").fill(ADMIN_EMAIL);
    await page.getByLabel("Password").fill(ADMIN_PASSWORD);
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 });
  });

  test("events page loads", async ({ page }) => {
    await page.goto("/events");
    await expect(page.getByRole("heading", { name: "Events" })).toBeVisible();
  });

  test("event detail shows attendees section", async ({ page }) => {
    await page.goto("/events");
    const firstLink = page.locator("table tbody tr a").first();
    const hasEvent = (await firstLink.count()) > 0;
    if (!hasEvent) {
      test.skip();
      return;
    }
    await firstLink.click();
    await expect(page.getByText("Attendees")).toBeVisible({ timeout: 10_000 });
  });
});
