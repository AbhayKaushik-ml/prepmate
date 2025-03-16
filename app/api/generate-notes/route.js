// Import the AI model for generating notes
import { courseOutline } from "@/configs/AiModel";
import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { courseId } = await req.json();
    
    if (!courseId) {
      return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
    }
    
    console.log('Generating notes for course:', courseId);
    
    // First, update status to "Generating"
    await db.update(STUDY_MATERIAL_TABLE)
      .set({ status: 'Generating' })
      .where(eq(STUDY_MATERIAL_TABLE.courseId, courseId));
    
    // Get the course data
    const courseData = await db.select()
      .from(STUDY_MATERIAL_TABLE)
      .where(eq(STUDY_MATERIAL_TABLE.courseId, courseId))
      .limit(1);
    
    if (courseData.length === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    
    const course = courseData[0];
    const chapters = course.courseLayout?.chapters;
    
    if (!chapters || !Array.isArray(chapters)) {
      return NextResponse.json({ error: "No chapters found in course" }, { status: 400 });
    }
    
    // Generate notes for each chapter in sequence (to avoid rate limiting)
    for (let index = 0; index < chapters.length; index++) {
      const chapter = chapters[index];
      try {
        console.log(`Generating notes for chapter ${index + 1}/${chapters.length}: ${chapter.chapter_title}`);
        
        const PROMPT = 'Generate exam material detail content for each chapter, Make sure to include all topic points in the content, make sure to give content in HTML format (Do not add HTML, Head, Body, title tag), The chapter:' + JSON.stringify(chapter);
        
        // Using courseOutline instead of generateNotes
        const result = await courseOutline.sendMessage(PROMPT);
        const aiResp = result.response.text();
        
        // Save to database
        await db.insert(CHAPTER_NOTES_TABLE).values({
          chapterId: index,
          courseId: courseId,
          notes: aiResp
        });
        
        console.log(`Completed notes for chapter ${index + 1}`);
      } catch (error) {
        console.error(`Error generating notes for chapter ${index + 1}:`, error);
        // Continue to next chapter even if one fails
      }
    }
    
    // Update status to "Ready"
    await db.update(STUDY_MATERIAL_TABLE)
      .set({ status: 'Ready' })
      .where(eq(STUDY_MATERIAL_TABLE.courseId, courseId));
    
    return NextResponse.json({ 
      success: true, 
      message: "Notes generated successfully" 
    });
    
  } catch (error) {
    console.error('Error generating notes:', error);
    
    // If there was an error, update status to "Failed"
    if (req.body?.courseId) {
      await db.update(STUDY_MATERIAL_TABLE)
        .set({ status: 'Failed' })
        .where(eq(STUDY_MATERIAL_TABLE.courseId, req.body.courseId));
    }
    
    return NextResponse.json({ 
      error: "Failed to generate notes",
      details: error.message 
    }, { status: 500 });
  }
} 