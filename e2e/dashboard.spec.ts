import { test, expect } from "@playwright/test";

const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL ?? "admin1@tcs.dev";
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? "TcsDev2026!";

async function login(page: import("@playwright/test").Page) {
  await page.goto("/login");
  await page.getByLabel("Email address").fill(ADMIN_EMAIL);
  await page.getByLabel("Password").fill(ADMIN_PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 });
}

test.describe("Dashboard", () => {
  test.skip(
    !process.env.NEXT_PUBLIC_SUPABASE_URL,
    "Requires Supabase env and running tcs-api",
  );

  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("KPI labels visible", async ({ page }) => {
    await expect(page.getByText("Total Members")).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText("Pending Approvals")).toBeVisible();
    await expect(page.getByText("Upcoming Events")).toBeVisible();
    await expect(page.getByText("Revenue (MTD)")).toBeVisible();
  });

  test("charts render after load", async ({ page }) => {
    await expect(page.getByText("Revenue Trend — 6 Months")).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.getByText("Weekly New Signups")).toBeVisible();
    // Charts should not stay on loading spinner once data arrives
    await expect(page.locator(".recharts-responsive-container").first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test("pending approvals section renders", async ({ page }) => {
    await expect(page.getByText("Pending Approvals", { exact: true })).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.getByRole("link", { name: "View all" })).toBeVisible();
  });
});
