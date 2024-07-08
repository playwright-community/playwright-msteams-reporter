import { getMentions } from "./getMentions";

describe("getMentions", () => {
  it("should return undefined for undefined mentionOnFailure", () => {
    const result = getMentions(undefined);
    expect(result).toBeUndefined();
  });

  it("should correctly parse mentionOnFailure with only emails", () => {
    const result = getMentions("email1@example.com, email2@example.com");
    expect(result).toEqual({
      message: "<at>email1@example.com</at>, <at>email2@example.com</at>",
      mentions: [
        { name: "email1@example.com", email: "email1@example.com" },
        { name: "email2@example.com", email: "email2@example.com" },
      ],
    });
  });

  it("should correctly parse mentionOnFailure with full names and emails", () => {
    const result = getMentions(
      "John Doe <john@example.com>, Jane Doe <jane@example.com>"
    );
    expect(result).toEqual({
      message: "<at>john@example.com</at>, <at>jane@example.com</at>",
      mentions: [
        { name: "John Doe", email: "john@example.com" },
        { name: "Jane Doe", email: "jane@example.com" },
      ],
    });
  });

  it("should handle a mix of emails and full names with emails", () => {
    const result = getMentions(
      "email1@example.com, John Doe <john@example.com>"
    );
    expect(result).toEqual({
      message: "<at>email1@example.com</at>, <at>john@example.com</at>",
      mentions: [
        { name: "email1@example.com", email: "email1@example.com" },
        { name: "John Doe", email: "john@example.com" },
      ],
    });
  });

  it("should return undefined for empty string", () => {
    const result = getMentions(" ");
    expect(result).toBeUndefined();
  });
});
