import { TestStatuses } from "../models";
import { getNotificationOutcome } from ".";
import { Images } from "../constants";

export const getNotificationBackground = (statuses: TestStatuses) => {
  const outcome = getNotificationOutcome(statuses);

  if (outcome === "passed") {
    return Images.success;
  }

  if (outcome === "flaky") {
    return Images.flaky;
  }

  return Images.failed;
};
