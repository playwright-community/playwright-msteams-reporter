import { validateWebhookUrl } from "./validateWebhookUrl";

describe("validateWebhookUrl", () => {
  it("Valid Power Automate webhook URL", () => {
    expect(
      validateWebhookUrl(
        "https://prod-00.westus.logic.azure.com:443/workflows/1234567890abcdef1234567890abcdef/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1234567890abcdef1234567890abcdef"
      )
    ).toBe(true);
  });

  it("Valid Power Automate webhook URL (with argument)", () => {
    expect(
      validateWebhookUrl(
        "https://prod-00.westus.logic.azure.com:443/workflows/1234567890abcdef1234567890abcdef/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1234567890abcdef1234567890abcdef",
        "powerautomate"
      )
    ).toBe(true);
  });

  it("Valid Power Automate webhook URL (France) (with argument)", () => {
    expect(
      validateWebhookUrl(
        "https://prod2-00.francecentral.logic.azure.com:443/workflows/1234567890abcdef1234567890abcdef/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1234567890abcdef1234567890abcdef",
        "powerautomate"
      )
    ).toBe(true);
  });

  it("Invalid Power Automate webhook URL 1", () => {
    expect(
      validateWebhookUrl(
        "https://prod-00.westus.azure.com:443/workflows/1234567890abcdef1234567890abcdef/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1234567890abcdef1234567890abcdef",
        "powerautomate"
      )
    ).toBe(false);
  });

  it("Invalid Power Automate webhook URL 2", () => {
    expect(
      validateWebhookUrl(
        "https://prod-00.westus.logic.azure.com:443/workflows/1234567890abcdef1234567890abcdef/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1234567890abcdef1234567890abcdef",
        "powerautomate"
      )
    ).toBe(false);
  });

  it("Valid MS Teams webhook URL", () => {
    expect(
      validateWebhookUrl(
        "https://tenant.webhook.office.com/webhookb2/12345678-1234-1234-1234-123456789abc@12345678-1234-1234-1234-123456789abc/IncomingWebhook/123456789abcdef123456789abcdef12/12345678-1234-1234-1234-123456789abc",
        "msteams"
      )
    ).toBe(true);
  });
  it("Invalid if MS Teams webhook URL is passed as Power Automate webhook URL", () => {
    expect(
      validateWebhookUrl(
        "https://tenant.webhook.office.com/webhookb2/12345678-1234-1234-1234-123456789abc@12345678-1234-1234-1234-123456789abc/IncomingWebhook/123456789abcdef123456789abcdef12/12345678-1234-1234-1234-123456789abc"
      )
    ).toBe(false);
  });

  it("Invalid MS Teams webhook URL 1", () => {
    expect(
      validateWebhookUrl(
        "https://tenant.webhook.office.com/webhookb2/12345678-1234-1234-1234-123456789abc@12345678-1234-1234-1234-123456789abc/IncomingWebhook/123456789abcdef123456789abcdef12/12345678-1234-1234-1234",
        "msteams"
      )
    ).toBe(false);
  });

  it("Invalid MS Teams webhook URL 2", () => {
    expect(
      validateWebhookUrl(
        "https://tenant.webhook.office.com/webhookb2/12345678-1x34-1234-1234-123456789@abc12345678-1234-1234-1234-123456789abc/IncomingWebhook/123456789abcdef123456789abcdef12/12345678-1234-1234-1234-123456789abc",
        "msteams"
      )
    ).toBe(false);
  });

  it("Invalid MS Teams webhook URL 3", () => {
    expect(
      validateWebhookUrl(
        "https://tenant.webhook.office.com/webhookb2/12345678-1234-1234-1234-123456789abc@12345678-1234-1234-1234-123456789abc/IncomingWebhooks/123456789abcdef123456789abcdef12/12345678-1234-1234-1234-123456789abc",
        "msteams"
      )
    ).toBe(false);
  });

  it("Incorrect type", () => {
    expect(
      validateWebhookUrl("https://just-a-random-url.com", "fake" as any)
    ).toBe(false);
  });
});
