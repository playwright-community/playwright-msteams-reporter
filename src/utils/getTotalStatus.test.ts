import { Suite } from "@playwright/test/reporter";
import { getTotalStatus } from "./getTotalStatus";

const baseSuite: Suite = {
  tests: [],
  title: "test",
  suites: [],
  titlePath: () => [""],
  project: () => undefined,
  allTests: () => [],
  entries: () => [],
  type: "root",
};

describe("getTotalStatus", () => {
  it("should return the correct total status when all tests have passed", () => {
    const suites: Suite[] = [
      {
        ...baseSuite,
        allTests: () =>
          [
            { outcome: () => "expected" },
            { outcome: () => "expected" },
          ] as any[],
      },
    ];

    const result = getTotalStatus(suites);

    expect(result).toEqual({
      passed: 2,
      failed: 0,
      flaky: 0,
      skipped: 0,
    });
  });

  it("should return the correct flaky total when there are flaky tests", () => {
    const suites: Suite[] = [
      {
        ...baseSuite,
        allTests: () =>
          [
            { outcome: () => "expected" },
            { outcome: () => "expected" },
            { outcome: () => "unexpected" },
            { outcome: () => "flaky" },
          ] as any[],
      },
    ];

    const result = getTotalStatus(suites);

    expect(result).toEqual({
      passed: 2,
      failed: 1,
      flaky: 1,
      skipped: 0,
    });
  });

  it("should return the correct total status when there are failed, skipped tests", () => {
    const suites: Suite[] = [
      {
        ...baseSuite,
        allTests: () =>
          [
            { outcome: () => "expected" },
            { outcome: () => "unexpected" },
            { outcome: () => "flaky" },
            { outcome: () => "unexpected" },
            { outcome: () => "skipped" },
          ] as any[],
      },
    ];

    const result = getTotalStatus(suites);

    expect(result).toEqual({
      passed: 1,
      failed: 2,
      flaky: 1,
      skipped: 1,
    });
  });

  it("should return the correct total status when there are no tests", () => {
    const suites: Suite[] = [];

    const result = getTotalStatus(suites);

    expect(result).toEqual({
      passed: 0,
      failed: 0,
      flaky: 0,
      skipped: 0,
    });
  });
});
