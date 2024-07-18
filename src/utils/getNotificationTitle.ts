import { TestStatuses } from "../models";
import { getNotificationOutcome } from ".";

export const getNotificationTitle = (statuses: TestStatuses): string => {
  const outcome = getNotificationOutcome(statuses);

  if (outcome === "passed") {
    return "Tests passed";
  }

  if (outcome === "flaky") {
    return "Tests passed with flaky tests";
  }

  return "Tests failed";
};
