import { Page, Locator } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {
  // Приклад винесення локаторів у окремі поля класу
  // readonly formLayoutsMenuItem: Locator;
  // readonly datePickerMenuItem: Locator;
  // readonly smartTableMenuItem: Locator;
  // readonly toastrMenuItem: Locator;
  // readonly tooltipMenuItem: Locator;

  constructor(page: Page) {
    super(page);
    // this.formLayoutsMenuItem = page.getByTitle("Form Layouts");
    // this.datePickerMenuItem = page.getByTitle("Datepicker");
    // this.smartTableMenuItem = page.getByTitle("Smart Table");
    // this.toastrMenuItem = page.getByTitle("Toastr");
    // this.tooltipMenuItem = page.getByTitle("Tooltip");
  }

  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expandedState = await groupMenuItem.getAttribute("aria-expanded");
    const isActive = expandedState === "true";
    if (!isActive) {
      await groupMenuItem.click();
    }
  }

  async formLayoutsPage() {
    // await this.page.getByText("Forms").click();
    await this.selectGroupMenuItem("Forms");
    await this.page.getByTitle("Form Layouts").click();
    // await this.page.waitForTimeout(5000);
    await this.waitForNumberOfSeconds(5);
  }
  async datepickerPage() {
    await this.selectGroupMenuItem("Forms");
    await this.page.waitForTimeout(1000);
    await this.page.getByTitle("Datepicker").click();
  }

  async smartTablePage() {
    await this.selectGroupMenuItem("Tables & Data");
    await this.page.getByTitle("Smart Table").click();
  }

  async toastrPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.page.getByTitle("Toastr").click();
  }

  async tooltipPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.page.getByTitle("Tooltip").click();
  }
}
