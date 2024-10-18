import { WebhookType } from "../models";

/**
 * Validates a webhook URL to ensure it meets the required format.
 *
 * @param webhookUrl - The webhook URL to validate.
 * @param type - The type of webhook to validate.
 * @returns A boolean indicating whether the webhook URL is valid.
 */
export const validateWebhookUrl = (
  webhookUrl: string,
  type?: WebhookType
): boolean => {
  if (!type || type === "powerautomate") {
    // https://prod-{int}.{region}.logic.azure.com:443/workflows/{id}/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig={sig}
    return !!(
      webhookUrl &&
      webhookUrl.startsWith("https://prod") &&
      webhookUrl.includes("logic.azure.com") &&
      webhookUrl.includes("/workflows/") &&
      webhookUrl.includes("/triggers/")
    );
  } else if (type === "msteams") {
    // https://tenant.webhook.office.com/webhookb2/{uuid}@{uuid}/IncomingWebhook/{id}/{uuid}
    const webhook_pattern =
      /^https:\/\/[a-zA-Z0-9]+.webhook.office.com\/webhookb2\/[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?\S+\/IncomingWebhook\/[a-zA-Z0-9]+\/[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?/;

    return webhook_pattern.test(webhookUrl);
  } else {
    return false;
  }
};
