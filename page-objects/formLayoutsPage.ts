import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";
export class FormLayoutPage extends HelperBase {
  constructor(page: Page) {
    super(page);
  }

  async submitUsingTheGridFormWithCredentialsAndSelectOption(
    email: string,
    password: string,
    optionText: string
  ) {
    const usingTheGridForm = this.page.locator("nb-card", {
      hasText: "Using the Grid",
    });

    await usingTheGridForm.locator("#inputEmail1").fill(email);

    await usingTheGridForm.locator("#inputPassword2").fill(password);

    await usingTheGridForm.getByLabel(optionText).check({ force: true });

    await usingTheGridForm.getByRole("button").click();
  }
  /**
   * This method fill out the Inline form with user details
   * @param name - should be first and last name
   * @param email - valid email for the test user
   * @param rememberMeCheckbox - true or false if user session to be safed
   */
  async submitInlineFormWithNameEmailAndCheckbox( 
    name: string,
    email: string,
    rememberMeCheckbox: boolean
  ) {
    const inlineForm = this.page.locator("nb-card", {
      hasText: "Inline form",
    });

    await inlineForm.getByRole("textbox", { name: "Jane Doe" }).fill(name);
    await inlineForm.getByRole("textbox", { name: "Email" }).fill(email);
    if (rememberMeCheckbox) {
      await inlineForm.getByRole("checkbox").check({ force: true });
    }
    await inlineForm.getByRole("button").click();
  }
}
