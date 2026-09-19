import { expect, test } from "@playwright/test";

test("scores a property and customizes the gear plan", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Make the night sky/ })).toBeVisible();
  await page.getByRole("button", { name: "Blue Ridge example" }).click();
  await page.getByRole("button", { name: "Build amenity plan" }).click();
  await expect(page.getByText("Strong potential")).toBeVisible();
  await expect(page.getByText("Hosted sky deck")).toBeVisible();
  await page.getByRole("button", { name: "Remove Tabletop smart telescope" }).click();
  await expect(page.getByRole("button", { name: "Restore Tabletop smart telescope" })).toBeVisible();
});

test("shows validation and switches the nightly guest guide", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Bortle class").fill("10");
  await page.getByRole("button", { name: "Build amenity plan" }).click();
  await expect(page.locator(".error[role='alert']")).toContainText("whole number from 1");
  await expect(page.getByRole("heading", { name: "Saturn after dark" })).toBeVisible();
  await page.getByRole("button", { name: /Sun, Sep 20/ }).click();
  await expect(page.getByRole("heading", { name: "Milky Way core" })).toBeVisible();
});

test("mobile workflow has no horizontal overflow", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile-only layout assertion");
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
  await page.getByRole("button", { name: "Desert example" }).click();
  await page.getByRole("button", { name: "Build amenity plan" }).click();
  await expect(page.getByText("Signature potential")).toBeVisible();
});
