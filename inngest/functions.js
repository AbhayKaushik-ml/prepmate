import { generateNotes } from "/configs/AiModel";
import { inngest } from "./client";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE } from "/configs/schema";
import { eq } from "drizzle-orm";
import { db } from "/configs/db";

// Define the hello world function that responds to test/hello.world events
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    console.log("Received event:", event);
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const CreateNewUser=inngest.createFunction(
  {id:'create-user'},
  {event:'user.create'},
  async({event,step})=>{
    // get Event data
    const result=await step.run('Check User and create New if not in DB',async()=>{

    })
  })

  export const GenerateNotes=inngest.createFunction(
    {id:'generate-course'},
    {event:'notes.generate'},
    async({event,step})=>{
      const {course}=event.data; // all record info

      // generate notes  for each chapter with AI
      const nodeResult=await step.run('Generate Chapter Notes',async()=>{
        const Chapters=course?.courseLayout?.chapters;
        let index=0;
        Chapters.forEach(async(chapter)=>{
          const PROMPT='Generate exam material detail content for each chapter, Make sure to include all topic points in the content, make sure to give content in HTML format( Do not add HTMLK, Head, Body, title tag), The chapters:'+JSON.stringify(chapter);
          const result= await generateNotes.sendMessage(PROMPT);
          const aiResp=result.response.text;

          await db.insert(CHAPTER_NOTES_TABLE).values({
            chapterId:index,
            courseId:course?.courseId,
            notes:aiResp
          })
          index=index+1;
        })
        return 'Completed'
      })

      // Update Status to 'Ready'
      const updateCourseStatusResukt=await step.run('Update Course Status to Ready',async()=>{
        const result=await db.update(STUDY_MATERIAL_TABLE).set({
          status:'Ready'
        }).where(eq(STUDY_MATERIAL_TABLE.courseId,course?.courseId))
        return 'success';
      });

    }
  )
