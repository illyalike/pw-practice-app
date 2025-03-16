import { test, expect } from "@playwright/test";
test("input fields", async ({ page }, testInfo) => {
  await page.goto("/");
  // Перевірка, чи використаний проект mobile
  if (testInfo.project.name === "mobile") {
    await page.locator(".sidebar-toggle").click();
  }
  await page.locator(".sidebar-toggle").click();
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
  if (testInfo.project.name === "mobile") {
    await page.locator(".sidebar-toggle").click();
  }
  const usingTheGridEmailInput = page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Email" });
  await usingTheGridEmailInput.fill("e@e.com");
  await usingTheGridEmailInput.clear();
  await usingTheGridEmailInput.pressSequentially("email@email.com");
});
