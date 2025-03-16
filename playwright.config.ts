import { defineConfig, devices } from "@playwright/test";

import type { TestOptions } from "./test-options";

import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig<TestOptions>({
  // timeout: 30000,
  // globalTimeout: 30000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Retry on CI only */
  retries: 1,
  reporter: [
    // ["json", { outputFile: "test-results/jsonReport.json" }],
    // ["junit", { outputFile: "test-results/junitReport.xml" }],
    // ["allure-playwright"],
    ["html"],
    process.env.CI ? ["dot"] : ["list"],
    // Add Argos reporter.
    [
      "@argos-ci/playwright/reporter",
      {
        // Upload to Argos on CI only.
        uploadToArgos: !!process.env.CI,

        // Set your Argos token (required if not using GitHub Actions).
        token: process.env.ARGOS_TOKEN,
      },
    ],
  ],
  expect: {
    timeout: 5000,
  },
  use: {
    // /* Configuration for Eyes VisualAI */
    // eyesConfig: {
    //   /* The following and other configuration parameters are documented at: https://applitools.com/tutorials/playwright/api/overview */
    //   apiKey: "12X100zecwfOQ9RhmAf0hlv1GUwby0JpWoVV1Rr8KGT108U110 ", // alternatively, set this via environment variable APPLITOOLS_API_KEY
    //   // serverUrl: 'https://eyes.applitools.com',

    //   // failTestsOnDiff: false,
    //   // appName: 'My App',
    //   // matchLevel: 'Strict',
    //   // batch: { name: 'My Batch' },
    //   // proxy: {url: 'http://127.0.0.1:8888'},
    //   // stitchMode: 'CSS',
    //   // matchTimeout: 0,
    //   // waitBeforeScreenshots: 50,
    //   // saveNewTests: true,
    // },

    // baseURL: "http://localhost:4200/",
    globalsQaURL: "https://www.globalsqa.com/demo-site/draganddrop/",
    baseURL:
      process.env.DEV === "1"
        ? "http://localhost:4200/"
        : process.env.STAGING === "1"
        ? "http://localhost:4200/"
        : "http://localhost:4200/",
    trace: "on-first-retry",
    // actionTimeout: 30000,
    // navigationTimeout: 30000
    video: {
      mode: "off",
      size: { width: 1920, height: 1080 },
    },
    screenshot: "only-on-failure",
  },

  projects: [
    // Створення проекту для конкретного тестового файлу
    {
      name: "pageObjectFullScreen",
      testMatch: "usePageObjects.spec.ts",
      use: {
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "dev-chrome",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:4200/" },
    },
    {
      name: "prod-chrome",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:4200/" },
    },
    {
      name: "dev-firefox",
      use: { ...devices["Desktop Firefox"], baseURL: "http://localhost:4200/" },
    },
    {
      name: "prod-firefox",
      use: { ...devices["Desktop Firefox"], baseURL: "http://localhost:4200/" },
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      // fullyParallel: true,
    },

    {
      name: "firefox",
      use: { browserName: "firefox" },
    },
    {
      name: "mobile",
      testMatch: "testMobile.spec.ts",
      use: {
        ...devices["iPhone 15 Pro"],
        // viewport: { width: 414, height: 800 },
      },
    },

    // {
    //   name: "webkit",
    //   use: { browserName: "webkit" },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run start",
    url: "http://localhost:4200/",
    // reuseExistingServer: !process.env.CI,
  },
});
