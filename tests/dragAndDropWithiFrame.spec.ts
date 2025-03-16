import { expect, Page } from "@playwright/test";
import { test } from "../test-options";

test("drag and drop with iframe", async ({ page, globalsQaURL }) => {
  await page.goto(globalsQaURL);

  // Get iFrame element
  const frame = page.frameLocator('[rel-title="Photo Manager"] iframe');

  const dragToElement = frame.locator("#trash");
  // drag and drop by dragTo()
  await frame.locator("li", { hasText: "High Tatras 2" }).dragTo(dragToElement);

  // more presice control
  await frame.locator("li", { hasText: "High Tatras 4" }).hover();
  await page.mouse.down();
  await dragToElement.hover();
  await page.mouse.up();

  // assertion for elements located in true position

  await expect(dragToElement.locator("li h5")).toHaveText([
    "High Tatras 2",
    "High Tatras 4",
  ]);
});
