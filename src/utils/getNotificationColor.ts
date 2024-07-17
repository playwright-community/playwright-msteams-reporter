import { TestStatuses } from "../models";
import { getNotificationOutcome } from ".";

export const getNotificationColor = (
  statuses: TestStatuses
): "Good" | "Warning" | "Attention" => {
  const outcome = getNotificationOutcome(statuses);

  if (outcome === "passed") {
    return "Good";
  }

  if (outcome === "flaky") {
    return "Warning";
  }

  return "Attention";
};
