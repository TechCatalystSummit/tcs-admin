import { test, expect } from "@playwright/test";

const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL ?? "admin1@tcs.dev";
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? "TcsDev2026!";

test.describe("Sponsors", () => {
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

  test("create sponsor modal submits", async ({ page }) => {
    await page.goto("/sponsors");
    await expect(page.getByRole("heading", { name: "Sponsors" })).toBeVisible();

    await page.getByRole("button", { name: "Add Sponsor" }).click();
    await page.getByLabel("Company name").fill(`E2E Sponsor ${Date.now()}`);
    await page.getByRole("button", { name: "Create sponsor" }).click();

    await expect(page.getByText("Sponsor created")).toBeVisible({ timeout: 10_000 });
  });
});
