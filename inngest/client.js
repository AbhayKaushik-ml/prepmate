import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ 
  id: "prepai",
  baseUrl: process.env.NEXT_PUBLIC_INNGEST_EVENT_KEY || undefined,
});
