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
  notifyOnSuccess?: boolean;
  mentionOnFailure?: string;
  mentionOnFailureText?: string;
  quiet?: boolean;
  debug?: boolean;
}

export default class MsTeamsReporter implements Reporter {
  private suite: Suite | undefined;

  constructor(private options: MsTeamsReporterOptions) {
    const defaultOptions: MsTeamsReporterOptions = {
      webhookUrl: undefined,
      webhookType: "msteams",
      title: "Playwright Test Results",
      linkToResultsUrl: undefined,
      linkToResultsText: "View test results",
      notifyOnSuccess: true,
      mentionOnFailure: undefined,
      mentionOnFailureText: "{mentions} please validate the test results.",
      quiet: false,
      debug: false,
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
    __: void | TestResult
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
