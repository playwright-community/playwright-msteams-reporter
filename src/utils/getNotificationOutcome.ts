import { TestStatuses } from "../models";

export const getNotificationOutcome = (
  statuses: TestStatuses
): "passed" | "flaky" | "failed" => {
  const isSuccess = statuses.failed === 0;
  const hasFlakyTests = statuses.flaky > 0;

  if (isSuccess && !hasFlakyTests) {
    return "passed";
  }

  if (isSuccess && hasFlakyTests) {
    return "flaky";
  }

  return "failed";
};
