import { test, expect } from "@playwright/test";

test.beforeEach("", async ({ page }) => {
  await page.goto("https://test.bukovel.com");
});

test("Mocked WebSokcet Request", async ({ page }) => {
  await page.on("dialog", async (dialog) => {
    console.log("i am here");
  });
  await page.waitForTimeout(5000);
});
