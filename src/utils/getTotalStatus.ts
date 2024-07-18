import { Suite } from "@playwright/test/reporter";
import { TestStatuses } from "../models";

export const getTotalStatus = (suites: Suite[]): TestStatuses => {
  let total = {
    passed: 0,
    flaky: 0,
    failed: 0,
    skipped: 0,
  };

  for (const suite of suites) {
    const testOutcome = suite.allTests().map((test) => {
      return test.outcome();
    });

    for (const outcome of testOutcome) {
      if (outcome === "expected") {
        total.passed++;
      } else if (outcome === "flaky") {
        total.flaky++;
      } else if (outcome === "unexpected") {
        total.failed++;
      } else if (outcome === "skipped") {
        total.skipped++;
      }
    }
  }

  return total;
};
