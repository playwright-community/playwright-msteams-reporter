import { AdaptiveCard } from "../models";

export const BaseAdaptiveCard = <AdaptiveCard>{
  type: "AdaptiveCard",
  body: [],
  msteams: {
    width: "Full",
  },
  actions: [],
  $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
  version: "1.6",
};
