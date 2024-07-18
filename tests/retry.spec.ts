import { test, expect, Page } from "@playwright/test";

test.describe("Test retry", () => {
  test.setTimeout(10000);

  test("First test should fail, next should work", async ({}, testInfo) => {
    if (testInfo.retry === 0) {
      expect(true).toBeFalsy();
    }
    expect(true).toBeTruthy();
  });

  test("Flaky test", async ({ page }, testInfo) => {
    await page.goto("https://www.eliostruyf.com", {
      waitUntil: "domcontentloaded",
    });

    if (testInfo.retry === 0) {
      await page.evaluate(() => {
        const logo: HTMLDivElement | null =
          window.document.querySelector(`#logo`);
        if (logo) {
          logo.style.display = "none";
        }
      });
    }

    let header = page.locator(`#logo`);
    await expect(header).toBeVisible({ timeout: 1000 });
  });

  test("Skip the test", async () => {
    test.skip(true, "Don't need to test this.");
  });

  test("Should work fine", async () => {
    expect(true).toBeTruthy();
  });

  test("Unexpected", async () => {
    test.skip(true, "Don't need to test this.");
  });
});
