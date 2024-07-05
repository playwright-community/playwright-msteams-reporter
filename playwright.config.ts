import { PlaywrightTestConfig, defineConfig, devices } from "@playwright/test";

if (process.env.NODE_ENV === "development") {
  require("dotenv").config({ path: ".env" });
}

const config: PlaywrightTestConfig<{}, {}> = {
  testDir: "./tests",
  timeout: 3 * 60 * 1000,
  expect: {
    timeout: 30 * 1000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 2,
  workers: process.env.CI ? 1 : 1,
  reporter: [
    [
      "./src/index.ts",
      {
        webhookUrl: process.env.TEAMS_WEBHOOK_URL,
        notifyOnSuccess: false,
      },
    ],
    [
      "./src/index.ts",
      {
        webhookUrl: process.env.TEAMS_WEBHOOK_URL,
        subject: "E2E Test Results",
        linkToResultsUrl: "https://eliostruyf.com",
        linkToResultsText: "View results",
        mentionOnFailure: "Elio <elio@struyfconsulting.be>, mail@elio.dev",
        mentionOnFailureText: "",
      },
    ],
  ],
  use: {
    actionTimeout: 0,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "setup",
      testMatch: "setup.spec.ts",
    },
    {
      name: "chromium",
      // dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig(config);
