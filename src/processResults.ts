import { Suite } from "@playwright/test/reporter";
import { MsTeamsReporterOptions } from ".";
import {
  createTable,
  createTableRow,
  getMentions,
  getTotalStatus,
  validateWebhookUrl,
} from "./utils";
import { Table } from "./models";
import { Images } from "./constants";

const adaptiveCard: any = {
  type: "AdaptiveCard",
  body: [],
  msteams: {
    width: "Full",
  },
  actions: [],
  $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
  version: "1.6",
};

export const processResults = async (
  suite: Suite | undefined,
  options: MsTeamsReporterOptions
) => {
  if (!options.webhookUrl) {
    console.error("No webhook URL provided");
    return;
  }

  if (!validateWebhookUrl(options.webhookUrl)) {
    console.error("Invalid webhook URL");
    return;
  }

  if (!suite) {
    console.error("No test suite found");
    return;
  }

  const totalStatus = getTotalStatus(suite.suites);
  const totalTests = suite.allTests().length;
  const failedTests = totalStatus.failed + totalStatus.timedOut;
  const isSuccess = failedTests === 0;

  if (isSuccess && !options.notifyOnSuccess) {
    if (!options.quiet) {
      console.log("No failed tests, skipping notification");
    }
    return;
  }

  const table: Table = createTable();
  table.rows.push(createTableRow("Type", "Total"));

  table.rows.push(
    createTableRow("Passed", totalStatus.passed, { style: "good" })
  );
  table.rows.push(
    createTableRow("Failed", failedTests, { style: "attention" })
  );
  table.rows.push(
    createTableRow("Skipped", totalStatus.skipped, { style: "warning" })
  );
  table.rows.push(
    createTableRow("Total tests", totalTests, {
      isSubtle: true,
      weight: "Bolder",
    })
  );

  const container = {
    type: "Container",
    items: [
      {
        type: "TextBlock",
        size: "ExtraLarge",
        weight: "Bolder",
        text: options.title,
      },
      {
        type: "TextBlock",
        size: "Large",
        weight: "Bolder",
        text: isSuccess ? "Tests passed" : "Tests failed",
        color: isSuccess ? "Good" : "Attention",
      },
      table,
    ] as any[],
    bleed: true,
    backgroundImage: {
      url: isSuccess ? Images.success : Images.failed,
      fillMode: "RepeatHorizontally",
    },
  };

  // Check if we should ping on failure
  if (!isSuccess) {
    const mentionData = getMentions(
      options.mentionOnFailure,
      options.mentionOnFailureText
    );
    if (mentionData?.message && mentionData.mentions.length > 0) {
      container.items.push({
        type: "TextBlock",
        size: "Medium",
        text: mentionData.message,
        wrap: true,
      });

      adaptiveCard.msteams.entities = mentionData.mentions.map((mention) => ({
        type: "mention",
        text: `<at>${mention.email}</at>`,
        mentioned: {
          id: mention.email,
          name: mention.name,
        },
      }));
    }
  }

  // Add the container to the body
  adaptiveCard.body.push(container);

  // Get the github actions run URL
  if (options.linkToResultsUrl) {
    adaptiveCard.actions.push({
      type: "Action.OpenUrl",
      title: options.linkToResultsText,
      url: options.linkToResultsUrl,
    });
  }

  const body = JSON.stringify(
    {
      type: "message",
      attachments: [
        {
          contentType: "application/vnd.microsoft.card.adaptive",
          contentUrl: null,
          content: adaptiveCard,
        },
      ],
    },
    null,
    2
  );

  if (options.debug) {
    console.log("Sending the following message:");
    console.log(body);
  }

  const response = await fetch(options.webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (response.ok) {
    if (!options.quiet) {
      console.log("Message sent successfully");
      const responseText = await response.text();
      if (responseText !== "1") {
        console.log(responseText);
      }
    }
  } else {
    console.error("Failed to send message");
    console.error(await response.text());
  }
};
