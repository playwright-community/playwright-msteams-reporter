import type {
  Reporter,
  FullConfig,
  Suite,
  TestCase,
  TestResult,
  FullResult,
} from "@playwright/test/reporter";
import { processResults } from "./processResults";
import { WebhookType } from "./models";

export interface MsTeamsReporterOptions {
  webhookUrl?: string;
  webhookType?: WebhookType;
  title?: string;
  linkToResultsUrl?: string;
  linkToResultsText?: string;
  linkUrlOnFailure?: string;
  linkTextOnFailure?: string;
  notifyOnSuccess?: boolean;
  mentionOnFailure?: string;
  mentionOnFailureText?: string;
  enableEmoji?: boolean;
  quiet?: boolean;
  debug?: boolean;
  azureDevOps?: boolean;
}

export default class MsTeamsReporter implements Reporter {
  private suite: Suite | undefined;

  constructor(private options: MsTeamsReporterOptions) {
    const defaultOptions: MsTeamsReporterOptions = {
      webhookUrl: undefined,
      webhookType: "powerautomate",
      title: "Playwright Test Results",
      linkToResultsUrl: undefined,
      linkToResultsText: "View test results",
      notifyOnSuccess: true,
      mentionOnFailure: undefined,
      mentionOnFailureText: "{mentions} please validate the test results.",
      enableEmoji: false,
      quiet: false,
      debug: false,
      azureDevOps: false,
    };

    this.options = { ...defaultOptions, ...options };

    console.log(`Using Microsoft Teams reporter`);

    if (process.env.NODE_ENV === "development" || this.options.debug) {
      console.log(`Using development mode`);
      console.log(`Options: ${JSON.stringify(this.options, null, 2)}`);
    }
  }

  onBegin(_: FullConfig, suite: Suite) {
    this.suite = suite;
  }

  onStdOut(
    chunk: string | Buffer,
    _: void | TestCase,
    __: void | TestResult,
  ): void {
    if (this.options.quiet) {
      return;
    }

    const text = chunk.toString("utf-8");
    process.stdout.write(text);
  }

  onStdErr(chunk: string | Buffer, _: TestCase, __: TestResult) {
    if (this.options.quiet) {
      return;
    }

    const text = chunk.toString("utf-8");
    process.stderr.write(text);
  }

  async onEnd(_: FullResult) {
    await processResults(this.suite, this.options);
  }
}
