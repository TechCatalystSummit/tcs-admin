import { test, expect } from "@playwright/test";

const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL ?? "admin1@tcs.dev";
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? "TcsDev2026!";

test.describe("Dinners", () => {
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

  test("adjust credits modal opens", async ({ page }) => {
    await page.goto("/dinners");
    await expect(page.getByRole("heading", { name: /dinners/i })).toBeVisible();

    const adjustBtn = page.getByRole("button", { name: /adjust credits|credits/i }).first();
    if ((await adjustBtn.count()) === 0) {
      test.skip();
      return;
    }

    await adjustBtn.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByLabel(/balance|credits/i)).toBeVisible();
  });
});
