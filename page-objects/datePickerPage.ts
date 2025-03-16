import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatePickerPage extends HelperBase {
  constructor(page: Page) {
    super(page);
  }
  /**
   *
   * @param numberOfDaysFromToday - The method takes a parameter that calculates the number of days relative to today. If it is not provided, it defaults to today.
   */
  async selectCommonDatePickerDateFromToday(numberOfDaysFromToday?: number) {
    const calendarInputField = this.page.getByPlaceholder("Form Picker");
    await calendarInputField.click();
    const dateToAssert = await this.selectDateInTheCalendar(
      numberOfDaysFromToday
    );

    await expect(calendarInputField).toHaveValue(dateToAssert);
  }
  /**
   * The method takes a parameters that calculates the number of days relative to today in range.
   * @param startDayFromToday - start of the range. Provide 0, if it must be today
   * @param endDayFromToday - end of the range.
   */
  async selectDatepickerWithRangeFromToday(
    startDayFromToday: number,
    endDayFromToday: number
  ) {
    const calendarInputField = this.page.getByPlaceholder("Range Picker");
    await calendarInputField.click();
    const dateToAssertStart = await this.selectDateInTheCalendar(
      startDayFromToday
    );
    const dateToAssertEnd = await this.selectDateInTheCalendar(endDayFromToday);
    const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`;
    await expect(calendarInputField).toHaveValue(dateToAssert);
  }

  private async selectDateInTheCalendar(numberOfDaysFromToday?: number) {
    let date = new Date();
    date.setDate(date.getDate() + numberOfDaysFromToday);
    const expectedDate = date.getDate().toString();
    const expectedMonthShort = date.toLocaleString("en-US", { month: "short" });
    const expectedMonthLong = date.toLocaleString("en-US", { month: "long" });
    const expectedYear = date.getFullYear();
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

    let calendarMonthAndYear = await this.page
      .locator("nb-calendar-view-mode")
      .textContent();

    const montAndYearToAssert = ` ${expectedMonthLong} ${expectedYear} `;

    const nextMonthBtn = this.page.locator(".next-month");

    // Loop to compare assert date with the current in datepicker

    while (!calendarMonthAndYear.includes(montAndYearToAssert)) {
      await nextMonthBtn.click();
      calendarMonthAndYear = await this.page
        .locator("nb-calendar-view-mode")
        .textContent();
    }

    await this.page
      .locator(".day-cell.ng-star-inserted:not(.bounding-month)")
      .getByText(expectedDate, { exact: true })
      .click();
    //   .highlight();
    // await this.page.pause();

    return dateToAssert;
  }
}
