import { validateWebhookUrl } from "./validateWebhookUrl";

describe("validateWebhookUrl", () => {
  it("Valid webhook URL", () => {
    expect(
      validateWebhookUrl(
        "https://tenant.webhook.office.com/webhookb2/12345678-1234-1234-1234-123456789abc@12345678-1234-1234-1234-123456789abc/IncomingWebhook/123456789abcdef123456789abcdef12/12345678-1234-1234-1234-123456789abc"
      )
    ).toBe(true);
  });

  it("Invalid webhook URL 1", () => {
    expect(
      validateWebhookUrl(
        "https://tenant.webhook.office.com/webhookb2/12345678-1234-1234-1234-123456789abc@12345678-1234-1234-1234-123456789abc/IncomingWebhook/123456789abcdef123456789abcdef12/12345678-1234-1234-1234"
      )
    ).toBe(false);
  });

  it("Invalid webhook URL 2", () => {
    expect(
      validateWebhookUrl(
        "https://tenant.webhook.office.com/webhookb2/12345678-1x34-1234-1234-123456789@abc12345678-1234-1234-1234-123456789abc/IncomingWebhook/123456789abcdef123456789abcdef12/12345678-1234-1234-1234-123456789abc"
      )
    ).toBe(false);
  });

  it("Invalid webhook URL 3", () => {
    expect(
      validateWebhookUrl(
        "https://tenant.webhook.office.com/webhookb2/12345678-1234-1234-1234-123456789abc@12345678-1234-1234-1234-123456789abc/IncomingWebhooks/123456789abcdef123456789abcdef12/12345678-1234-1234-1234-123456789abc"
      )
    ).toBe(false);
  });
});
