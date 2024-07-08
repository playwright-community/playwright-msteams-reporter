import { Suite } from "@playwright/test/reporter";
import { processResults } from "./processResults";

const WEBHOOK_URL = `https://tenant.webhook.office.com/webhookb2/12345678-1234-1234-1234-123456789abc@12345678-1234-1234-1234-123456789abc/IncomingWebhook/123456789abcdef123456789abcdef12/12345678-1234-1234-1234-123456789abc`;

const DEFAULT_OPTIONS = {
  webhookUrl: undefined,
  title: "Playwright Test Results",
  linkToResultsUrl: undefined,
  linkToResultsText: "View test results",
  notifyOnSuccess: true,
  mentionOnFailure: undefined,
  mentionOnFailureText: "{mentions} please validate the test results.",
  quiet: false,
};

const SUITE_MOCK = {
  suites: [
    {
      allTests: () => [{ results: [{ status: "passed" }] }],
    },
    {
      allTests: () => [
        { results: [{ status: "passed" }] },
        { results: [{ status: "passed" }] },
      ],
    },
  ],
  allTests: () => [{}, {}, {}],
};

describe("processResults", () => {
  it("should return early if no webhook URL is provided", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    const options = {
      ...DEFAULT_OPTIONS,
      webhookUrl: undefined,
    };
    await processResults(undefined, options);
    expect(consoleErrorSpy).toHaveBeenCalledWith("No webhook URL provided");
  });

  it("should return early if an invalid webhook URL is provided", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    const options = {
      ...DEFAULT_OPTIONS,
      webhookUrl: "invalid-url",
    };
    await processResults(undefined, options);
    expect(consoleErrorSpy).toHaveBeenCalledWith("Invalid webhook URL");
  });

  it("should return early if no test suite is found", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    const options = {
      ...DEFAULT_OPTIONS,
      webhookUrl: WEBHOOK_URL,
    };
    await processResults(undefined, options);
    expect(consoleErrorSpy).toHaveBeenCalledWith("No test suite found");
  });

  it("should skip notification if there are no failed tests and notifyOnSuccess is false", async () => {
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
    const options = {
      ...DEFAULT_OPTIONS,
      webhookUrl: WEBHOOK_URL,
      notifyOnSuccess: false,
    };
    const suite: any = {
      suites: [],
      allTests: () => [],
    };
    await processResults(suite, options);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "No failed tests, skipping notification"
    );
  });

  it("should send a message successfully", async () => {
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
    const fetchMock = jest
      .fn()
      .mockResolvedValue({ ok: true, text: () => "1" });
    global.fetch = fetchMock;
    const options = {
      ...DEFAULT_OPTIONS,
      webhookUrl: WEBHOOK_URL,
    };
    await processResults(SUITE_MOCK as any, options);
    expect(fetchMock).toHaveBeenCalledWith(WEBHOOK_URL, expect.any(Object));
    expect(consoleLogSpy).toHaveBeenCalledWith("Message sent successfully");
  });

  it("should log an error if sending the message fails", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    const fetchMock = jest
      .fn()
      .mockResolvedValue({ ok: false, text: () => "Error" });
    global.fetch = fetchMock;
    const options = {
      ...DEFAULT_OPTIONS,
      webhookUrl: WEBHOOK_URL,
    };
    await processResults(SUITE_MOCK as any, options);
    expect(fetchMock).toHaveBeenCalledWith(WEBHOOK_URL, expect.any(Object));
    expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to send message");
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error");
  });
});
