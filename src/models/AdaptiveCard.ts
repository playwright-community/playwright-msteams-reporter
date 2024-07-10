export interface AdaptiveCard {
  type: "AdaptiveCard";
  version: string;
  body: any[];
  msteams: {
    width?: "Full";
    entities?: {
      type: "mention";
      text: string;
      mentioned: {
        id: string;
        name: string;
      };
    }[];
  };
  actions: any[];
}
