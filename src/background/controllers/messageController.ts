import { MessagesOneWay } from "app/utils/api/messages";

export const tabPayloadChannel = new MessagesOneWay<{
  tabId: number;
  url: string;
}>("tab-payload");

// define static methods here
export class MessageHandler {}
