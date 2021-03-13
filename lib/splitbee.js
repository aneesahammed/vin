import { SplitbeeAnalytics } from "@splitbee/node";

export const splitbeeInit = () => {
  if (process.env.SPLITBEE_TOKEN) {
    return new SplitbeeAnalytics(process.env.SPLITBEE_TOKEN);
  }
};
