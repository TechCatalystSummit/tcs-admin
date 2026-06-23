import { test, expect } from "@playwright/test";

const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL ?? "admin1@tcs.dev";
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? "TcsDev2026!";

test.describe("Members", () => {
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

  test("approvals page loads", async ({ page }) => {
    await page.goto("/members/approvals");
    await expect(page.getByRole("heading", { name: "Member Approvals" })).toBeVisible();
  });
});
