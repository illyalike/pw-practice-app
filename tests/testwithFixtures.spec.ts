import { test } from "../test-options";
import { Page, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("paramethrized methods", async ({ pageManager }) => {
  const randomFullName = faker.person.fullName();
  const randomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(
    1000
  )}@gmail.com`;

  await pageManager
    .onFormLayoutPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      process.env.USERNAME,
      process.env.PASSWORD,
      "Disabled Option"
    );
  await pageManager
    .onFormLayoutPage()
    .submitInlineFormWithNameEmailAndCheckbox(
      randomFullName,
      randomEmail,
      true
    );
});
