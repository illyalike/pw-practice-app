import { test, Page, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import { faker } from "@faker-js/faker";
const text = 1;
test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("navigate to form page @smoke @regression", async ({ page }) => {
  const pageManager = new PageManager(page);
  await pageManager.navigateTo().formLayoutsPage();
  await pageManager.navigateTo().datepickerPage();
  await pageManager.navigateTo().smartTablePage();
  await pageManager.navigateTo().toastrPage();
  await pageManager.navigateTo().tooltipPage();
});

test("paramethrized methods @smoke", async ({ page }) => {
  const pageManager = new PageManager(page);
  const randomFullName = faker.person.fullName();
  const randomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(
    1000
  )}@gmail.com`;

  await pageManager.navigateTo().formLayoutsPage();
  await pageManager
    .onFormLayoutPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      process.env.USERNAME,
      process.env.PASSWORD,
      "Disabled Option"
    );
  await page.screenshot({ path: "screenshots/formLayoutsPage.png" });
  await pageManager
    .onFormLayoutPage()
    .submitInlineFormWithNameEmailAndCheckbox(
      randomFullName,
      randomEmail,
      true
    );
  await page
    .locator("nb-card", {
      hasText: "Inline form",
    })
    .screenshot({ path: "screenshots/inlineForm.png" });
  const buffer = await page.screenshot();
  console.log(buffer.toString("base64"));
  await pageManager.navigateTo().datepickerPage();
  await pageManager
    .datePickerLayoutPage()
    .selectCommonDatePickerDateFromToday(4);
  await pageManager
    .datePickerLayoutPage()
    .selectDatepickerWithRangeFromToday(0, 0);
});

test.only("testing with argos ci", async ({ page }) => {
  const pageManager = new PageManager(page);
  await pageManager.navigateTo().formLayoutsPage();
  await pageManager.navigateTo().datepickerPage();
});
