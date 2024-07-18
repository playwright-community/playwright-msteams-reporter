import { TestStatuses } from "../models";
import { getNotificationBackground } from ".";
import { Images } from "../constants";

describe("getNotificationBackground", () => {
  it("Should return 'success' background", () => {
    const statuses: TestStatuses = {
      passed: 1,
      failed: 0,
      flaky: 0,
      skipped: 0,
    };

    const title = getNotificationBackground(statuses);

    expect(title).toBe(Images.success);
  });

  it("Should return 'flaky' background", () => {
    const statuses: TestStatuses = {
      passed: 1,
      failed: 0,
      flaky: 1,
      skipped: 0,
    };

    const title = getNotificationBackground(statuses);

    expect(title).toBe(Images.flaky);
  });

  it("Should return 'failed' background", () => {
    const statuses: TestStatuses = {
      passed: 1,
      failed: 1,
      flaky: 1,
      skipped: 0,
    };

    const title = getNotificationBackground(statuses);

    expect(title).toBe(Images.failed);
  });
});
