import { TestStatuses } from "../models";
import { getNotificationTitle } from ".";

describe("getNotificationTitle", () => {
  it("should return 'Tests passed' when the outcome is 'passed'", () => {
    const statuses: TestStatuses = {
      passed: 1,
      failed: 0,
      flaky: 0,
      skipped: 0,
    };

    const title = getNotificationTitle(statuses);

    expect(title).toBe("Tests passed");
  });

  it("should return 'Tests passed with flaky tests' when the outcome is 'flaky'", () => {
    const statuses: TestStatuses = {
      passed: 1,
      failed: 0,
      flaky: 1,
      skipped: 0,
    };

    const title = getNotificationTitle(statuses);

    expect(title).toBe("Tests passed with flaky tests");
  });

  it("should return 'Tests failed' when the outcome is neither 'passed' nor 'flaky'", () => {
    const statuses: TestStatuses = {
      passed: 1,
      failed: 1,
      flaky: 1,
      skipped: 0,
    };

    const title = getNotificationTitle(statuses);

    expect(title).toBe("Tests failed");
  });

  it("should return 'Tests passed' when only skipped", () => {
    const statuses: TestStatuses = {
      passed: 0,
      failed: 0,
      flaky: 0,
      skipped: 1,
    };

    const title = getNotificationTitle(statuses);

    expect(title).toBe("Tests passed");
  });
});
