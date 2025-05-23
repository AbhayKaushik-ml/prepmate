import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { helloWorld } from "@/inngest/functions";
import { GenerateNotes } from "@/inngest/functions";
import { GenerateStudyTypeContent } from "@/inngest/functions";
import { CreateNewUser } from "@/inngest/functions";

// Create an API route that serves the Inngest functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    helloWorld,
    CreateNewUser,
    GenerateNotes,
    GenerateStudyTypeContent
  ],
});
