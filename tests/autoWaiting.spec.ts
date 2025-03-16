import { test, expect, Page } from "@playwright/test";

test.beforeEach("before each test", async ({ page }, testInfo) => {
  // visit to the page
  await page.goto(process.env.URL);

  // trigger the ajax request
  await page.getByText("Button Triggering AJAX Request").click();

  // Збільшення тестового таймауту на 2 секунди
  testInfo.setTimeout(testInfo.timeout + 2000);
});

test("auto waiting", async ({ page }) => {
  const successButton = page.locator(".bg-success");
  //   await successButton.click();

  //   const successText = await successButton.textContent();

  // The metohd to wait for the element, with the method which dont have the auto-waiting

  await successButton.waitFor({ state: "visible" });

  // allTextContents method do not have auto-waiting
  const allSuccessText = await successButton.allTextContents();

  //   expect(successText).toEqual("Data loaded with AJAX get request.");

  // expect(allSuccessText).toEqual(["Data loaded with AJAX get request."]);

  // timeout of locator assertion - 5 sec, but we updated this value to 20sec.

  await expect(successButton).toHaveText("Data loaded with AJAX get request.", {
    timeout: 20000,
  });
});

test.skip("alternative waits", async ({ page }) => {
  // wait for particular response

  await page.waitForResponse("http://uitestingplayground.com/ajaxdata");

  // wait for network calls to be completed ('NOT RECOMMENDED') - for all api calls

  // await page.waitForLoadState("networkidle");

  const successButton = page.locator(".bg-success");

  // wait for element
  await page.waitForSelector(".bg-success");

  const allSuccessText = await successButton.allTextContents();

  expect(allSuccessText).toEqual(["Data loaded with AJAX get request."]);
});

test.skip("timeouts", async ({ page }) => {
  test.slow();
  const successButton = page.locator(".bg-success");

  await successButton.click();
});
