import { TestStatuses } from "../models";
import { getNotificationColor } from ".";

describe("getNotificationColor", () => {
  it("Should return 'good' background", () => {
    const statuses: TestStatuses = {
      passed: 1,
      failed: 0,
      flaky: 0,
      skipped: 0,
    };

    const title = getNotificationColor(statuses);

    expect(title).toBe("Good");
  });

  it("Should return 'warning' background", () => {
    const statuses: TestStatuses = {
      passed: 1,
      failed: 0,
      flaky: 1,
      skipped: 0,
    };

    const title = getNotificationColor(statuses);

    expect(title).toBe("Warning");
  });

  it("Should return 'attention' background", () => {
    const statuses: TestStatuses = {
      passed: 1,
      failed: 1,
      flaky: 1,
      skipped: 0,
    };

    const title = getNotificationColor(statuses);

    expect(title).toBe("Attention");
  });
});
