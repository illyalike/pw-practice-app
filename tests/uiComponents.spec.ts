import { test, expect, Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe.parallel("Form Layouts page @block", () => {
  // test.describe.configure({ retries: 2 });
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("input fields", async ({ page }, testInfo) => {
    // налаштування перед запуском наступного retry тесту
    if (testInfo.retry) {
      //do something
    }
    const usingTheGridEmailInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "email" });

    await usingTheGridEmailInput.fill("e@e.com");
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially(
      "email@email.com"
      // , {
      //   delay: 500,
      // }
    );

    // Generic Assetrion

    const inputValue = await usingTheGridEmailInput.inputValue();

    await expect(inputValue).toEqual("email@email.com");

    // locator assertion

    await expect(usingTheGridEmailInput).toHaveValue("email@email.com");
  });

  test("radio buttons", async ({ page }) => {
    const usingTheGridForm = page.locator("nb-card", {
      hasText: "Using the Grid",
    });

    // Get Radio by Role

    await usingTheGridForm
      .getByRole("radio", { name: "Option 1" })
      .check({ force: true });

    // Get Radio By Label

    await usingTheGridForm.getByLabel("Option 2").check({ force: true });

    // Generic type of the assertion

    // const radioStatusOption1 = await usingTheGridForm
    //   .getByLabel("Option 1")
    //   .isChecked();
    // Скріншот елементу форми
    await expect(usingTheGridForm).toHaveScreenshot();
    // await expect(radioStatusOption1).toBeTruthy();

    // Locator type of assertion

    // await expect(usingTheGridForm.getByLabel("Option 1")).toBeChecked();

    // Assert that Option 2 is unchecked

    // const radioStatusOption2 = await usingTheGridForm
    //   .getByLabel("Option 2")
    //   .isChecked();
    // await expect(radioStatusOption2).toBeFalsy();
  });
});

test("checkboxes", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Toastr").click();

  // Select checkbox by a checkbox

  await page
    .getByRole("checkbox", { name: "Hide on click" })
    .uncheck({ force: true });

  // how to check or uncheck all checkboxes

  const allCheckBoxes = page.getByRole("checkbox");

  //   const test = await allCheckBoxes.all();

  //   test.forEach((checkbox) => {
  //     checkbox.check({ force: true });
  //   });

  for (const checkbox of await allCheckBoxes.all()) {
    await checkbox.check({ force: true });
  }
});

test("lights and dropdowns", async ({ page }) => {
  const dropDownMenu = page.locator("ngx-header nb-select");

  await dropDownMenu.click();

  // how to select items in the list

  await page.getByRole("list"); // when the list has a UL tag ( parent list item )

  await page.getByRole("listitem"); // when the list has LI tag ( array of list items )

  // locator for the option list items

  //   const optionList = page.getByRole("list").locator("nb-option");

  const optionList = page.locator("nb-option-list nb-option");

  // locator assertion

  await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);

  // Click on the item, tho change theme in Cosmic
  await optionList.filter({ hasText: "Cosmic" }).click();

  // assetrion of the theme ( backGround color )

  const header = page.locator("nb-layout-header");

  await expect(header).toHaveCSS("background-color", "rgb(50, 50, 89)");

  const colors = {
    Light: "rgb(255, 255, 255)",
    Dark: "rgb(34, 43, 69)",
    Cosmic: "rgb(50, 50, 89)",
    Corporate: "rgb(255, 255, 255)",
  };
  await dropDownMenu.click();
  for (const color in colors) {
    await optionList.filter({ hasText: color }).click();
    await expect(header).toHaveCSS("background-color", colors[color]);
    if (color != "Corparate") {
      await dropDownMenu.click();
    }
  }
});

test("tooltips", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Tooltip").click();

  const toolTipCard = page
    .locator("nb-card")
    .filter({ hasText: "Tooltip Placements" });

  await toolTipCard.getByRole("button", { name: "top" }).hover();

  // page.getByRole('tooltip') // if you have a role tooltip created

  const tooltip = await page.locator("nb-tooltip").textContent();

  await expect(tooltip).toEqual("This is a tooltip");
});

test("dialog box", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  page.on("dialog", (dialog) => {
    expect(dialog.message()).toEqual("Are you sure you want to delete?");
    dialog.accept();
  });
  await page
    .getByRole("table")
    .locator("tr")
    .filter({ has: page.locator("td", { hasText: /^1$/ }) })
    .locator(".nb-trash")
    .click();

  await expect(page.locator("table tr").first()).not.toHaveText(
    "mdo@gmail.com"
  );
});

test("web tables", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  // Get the row by any texts in this row
  const targetRow = page
    .getByRole("row")
    // .filter({ has: page.locator("td", { hasText: /^1$/ }) });
    .filter({ has: page.locator("td").nth(1).getByText("1", { exact: true }) });
  await targetRow.locator(".nb-edit").click();

  await page.locator("input-editor").getByPlaceholder("Age").clear();
  await page.locator("input-editor").getByPlaceholder("Age").fill("35");
  await page.locator(".nb-checkmark").click();

  // get the row based on the value in the specific column

  await page.locator(".ng2-smart-pagination-nav").getByText("2").click();
  const targetRowById = page.getByRole("row").filter({
    has: page.locator("td").nth(1).getByText("11", { exact: true }),
  });
  await targetRowById.locator(".nb-edit").click();

  await page.locator("input-editor").getByPlaceholder("E-mail").clear();
  await page.locator("input-editor").getByPlaceholder("E-mail").fill("e@e.com");
  await page.locator(".nb-checkmark").click();

  await expect(targetRowById.locator("td").nth(5)).toHaveText("e@e.com");

  // test filter of the table

  const ages = ["20", "30", "40", "200"];

  for (const age of ages) {
    await page.locator("input-filter").getByPlaceholder("Age").clear();
    await page.locator("input-filter").getByPlaceholder("Age").fill(age);
    await page.waitForTimeout(500);
    const rows = page.locator("tbody tr");
    for (let row of await rows.all()) {
      const cellValue = await row.locator("td").last().textContent();
      if (age === "200") {
        await expect(page.locator("tbody")).toHaveText("No data found");
      } else {
        await expect(cellValue).toEqual(age);
      }
    }
  }
});

test("datepicker", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();

  const calendarInputField = page.getByPlaceholder("Form Picker");
  await calendarInputField.click();

  let date = new Date();
  date.setDate(date.getDate() + 30);
  const expectedDate = date.getDate().toString();
  console.log(date);
  const expectedMonthShort = date.toLocaleString("en-US", { month: "short" });
  const expectedMonthLong = date.toLocaleString("en-US", { month: "long" });
  console.log(expectedMonthShort);
  const expectedYear = date.getFullYear();
  const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

  let calendarMonthAndYear = await page
    .locator("nb-calendar-view-mode")
    .textContent();

  const montAndYearToAssert = ` ${expectedMonthLong} ${expectedYear} `;

  const nextMonthBtn = page.locator(".next-month");

  // Loop to compare assert date with the current in datepicker

  while (!calendarMonthAndYear.includes(montAndYearToAssert)) {
    await nextMonthBtn.click();
    calendarMonthAndYear = await page
      .locator("nb-calendar-view-mode")
      .textContent();
  }

  await page
    .locator('[class="day-cell ng-star-inserted"]')
    .getByText(expectedDate, { exact: true })
    .click();

  await expect(calendarInputField).toHaveValue(dateToAssert);
});

test("sliders", async ({ page }) => {
  // Update attr

  const tempGauge = page.locator(
    '[tabtitle="Temperature"] ngx-temperature-dragger circle'
  );

  // await tempGauge.evaluate((node) => {
  //   node.setAttribute("cx", "232.630");
  //   node.setAttribute("cy", "232.630");
  // });

  // await tempGauge.click()

  // Simulate the actual mouse movement

  const tempBox = page.locator(
    '[tabtitle="Temperature"] ngx-temperature-dragger circle'
  );
  tempBox.scrollIntoViewIfNeeded();

  const tempBoundingBox = await tempBox.boundingBox();
  const x = tempBoundingBox.x + tempBoundingBox.width / 2;
  const y = tempBoundingBox.y + tempBoundingBox.height / 2;
  // tempBoundingBox.x = x;
  // tempBoundingBox.y = y;

  // drag the mouse on the center of boundingBox

  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 100, y);
  await page.mouse.move(x + 100, y + 50);
  await page.mouse.up();
});
