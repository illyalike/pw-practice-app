import { test, expect, Page } from "@playwright/test";

test.beforeEach("before each test", async ({ page }) => {
  // visit to the page
  await page.goto("/");

  // open the forms tab
  await page.getByTitle("Forms").click();

  // open forms layout

  await page
    .getByTitle("Form Layouts")
    .and(page.locator("a[href]", { hasText: /layouts/i }))
    .click();
});

test("Locator Syntax Rules", async ({ page }) => {
  // by TagName
  await page.locator("input").first().click();

  // byId
  await page.locator("#inputEmail1").click();

  // by classValue
  page.locator(".shape-rectangle");

  // by attr
  page.locator('[paceholder="Email"]');

  // by class Value (full)
  page.locator(
    '[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]'
  );

  // combine differen selectors
  page.locator("input[paceholder='Email'][type='email']");

  // by xPath
  page.locator("//*[@id='inputEmail1']");

  // by partial text match
  page.locator(':text("Using")');

  // by exact text match
  page.locator(':text-is("Using the grid")');
});

test("User-Facing Locators", async ({ page }) => {
  await page.getByRole("textbox", { name: "Email" }).first().click();

  await page.getByLabel("Email").first().click();

  await page.getByPlaceholder("Email").first().click();

  await page.getByText("Using the Grid").click();

  await page.getByTitle("IoT Dashboard").click();

  // await page.getByTestId("SignIn").click();
});

test("locating child elements", async ({ page }) => {
  await page.locator("nb-card nb-radio :text-is('Option 1')").click();

  await page
    .locator("nb-card")
    .locator("nb-radio")
    .locator(':text-is("Option 2")')
    .click();

  await page
    .locator("nb-card")
    .getByRole("button", { name: "Sign in" })
    .first()
    .click();

  await page.locator("nb-card").nth(3).getByRole("button").click();
});

test("locating parent elements", async ({ page }) => {
  await page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Email" })
    .fill("email@email.com");

  await page
    .locator("nb-card", { has: page.locator("#inputEmail1") })
    .getByRole("textbox", { name: "Email" })
    .click();

  await page
    .locator("nb-card")
    .filter({ hasText: "Basic form" })
    .getByRole("textbox", { name: "Email" })
    .click();

  await page
    .locator("nb-card")
    .filter({ has: page.locator('button[status="danger"]') })
    .getByRole("textbox", { name: "Email" })
    .click();

  await page
    .locator("nb-card")
    .filter({ has: page.locator("nb-checkbox") })
    .filter({ hasText: "Sign in" })
    .getByRole("textbox", { name: "Email" })
    .click();

  await page
    .locator(':text-is("Using the Grid")')
    .locator("..")
    .getByRole("textbox", { name: "Email" })
    .click();
});

test("Re-using locators", async ({ page }) => {
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });

  const emailField = basicForm.getByRole("textbox", { name: "Email" });

  await emailField.fill("email@email.com");

  await basicForm.getByRole("textbox", { name: "Password" }).fill("12341234");

  await basicForm.locator("nb-checkbox").click();

  await basicForm.getByRole("button").click();

  await expect(emailField).toHaveValue("email@email.com");
});

test("Extracting values", async ({ page }) => {
  // single text value

  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });

  const emailField = basicForm.getByRole("textbox", { name: "Email" });

  const buttonText = await basicForm.getByRole("button").textContent();

  expect(buttonText).toEqual("Submit");

  //all text values

  const radioTextArr = await page.locator("nb-radio").allTextContents();

  expect(radioTextArr).toContain("Option 1");

  //input value

  await emailField.fill("e@e.com");

  const emailInputValue = await emailField.inputValue();

  expect(emailInputValue).toEqual("e@e.com");

  // placeholder attr value

  const placeholderValue = await emailField.getAttribute("placeholder");

  expect(placeholderValue).toEqual("Email");
});

test("Assertions", async ({ page }) => {
  const basicFormButton = page
    .locator("nb-card")
    .filter({ hasText: "Basic form" })
    .locator("button");

  // General Assertions

  const value = 5;
  expect(value).toEqual(5);

  const buttonFormText = await basicFormButton.textContent();
  expect(buttonFormText).toEqual("Submit");

  // Locator Assertions

  await expect(basicFormButton).toHaveText("Submit");

  // Soft Assertions

  await expect.soft(basicFormButton).toHaveText("Submit");
  await basicFormButton.click();
});
// let newPage: Page;

// test.beforeAll("fff", async ({ browser }) => {
//   const newContext = await browser.newContext(); // create new context
//   newPage = await newContext.newPage(); // create new page in separete context

//   // Open the base URL
//   await newPage.goto("http://localhost:4200/");

//   // Open the forms tab
//   await newPage.getByTitle("Forms").click();
// });

// test.describe("first test suite", () => {
//   test.beforeEach(async ({ page }) => {});
//   test("first test", async ({ page }) => {});

//   test("navigate to datepicker page", async ({ page }) => {
//     // await page.getByTitle("Forms").click();

//     await page.getByTitle("Datepicker").click();
//   });
// });
