import { PluginDefaults } from "../constants";

/**
 * Retrieves mentions from a string and returns an object containing the message and mentions.
 * @param mentionOnFailure - The string containing the mentions.
 * @param mentionOnFailureText - Optional text to replace the mention placeholder in the message.
 * @returns An object containing the message and mentions, or undefined if no mentions are found.
 */
export const getMentions = (
  mentionOnFailure: string | undefined,
  mentionOnFailureText?: string
):
  | { message: string; mentions: { name: string; email: string }[] }
  | undefined => {
  if (!mentionOnFailure) {
    return;
  }

  const mentions = mentionOnFailure
    .split(",")
    .filter((m) => m.trim() !== "")
    .map((mention) => {
      mention = mention.trim();

      // Mention can be just an "email" or "full name <email>"
      if (!mention.includes("<")) {
        return {
          name: mention,
          email: mention,
        };
      } else {
        const parts = mention.split("<");
        return {
          name: parts[0].trim(),
          email: parts[1].replace(">", "").trim(),
        };
      }
    });

  if (mentions.length > 0) {
    const mentionsText = mentions
      .map((mention) => `<at>${mention.email}</at>`)
      .join(", ");

    const message = (
      mentionOnFailureText || PluginDefaults.mentionPlaceholder
    ).replace(PluginDefaults.mentionPlaceholder, mentionsText);

    return {
      message,
      mentions,
    };
  }

  return;
};
