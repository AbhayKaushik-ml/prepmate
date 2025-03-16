import { courseOutline } from "@/configs/AiModel";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";
import { db } from "@/configs/db";

export async function POST(req) {
  try {
    const { courseId, topic, studyType, difficultyLevel, createdBy } = await req.json();

    if (!topic || !studyType || !difficultyLevel) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log('Generating course outline for:', { topic, studyType, difficultyLevel });

    const PROMPT = `Generate a study material for ${topic} with ${studyType} course type and level of difficulty will be ${difficultyLevel} with summary of course, List of Chapters along with summary for each chapter, Topic list in each chapter in JSON format`;
    
    // generate course layout using AI
    try {
      // Send the prompt to the AI model
      const aiResp = await courseOutline.sendMessage(PROMPT);
      const responseText = aiResp.response.text();
      console.log('AI response received');
      
      // Parse the JSON from the response
      let aiResult;
      try {
        // Try to extract JSON from the text (it might be wrapped in markdown code blocks)
        const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || 
                          responseText.match(/```\n([\s\S]*?)\n```/) ||
                          [null, responseText];
                          
        const jsonContent = jsonMatch[1] || responseText;
        aiResult = JSON.parse(jsonContent.trim());
      } catch (jsonError) {
        console.error('Failed to parse JSON from AI response:', jsonError);
        console.log('Raw response:', responseText);
        return NextResponse.json(
          { error: "Failed to parse AI response" },
          { status: 500 }
        );
      }

      // save the result along with user input
      const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
        courseId: courseId,
        courseType: studyType,
        createdBy: createdBy,
        topic: topic,
        courseLayout: aiResult,
        status: 'New',
      }).returning();

      console.log('Course outline saved:', dbResult[0]);
      
      return NextResponse.json({ result: dbResult[0] });
    } catch (aiError) {
      console.error('AI or Database error:', aiError);
      return NextResponse.json(
        { error: "Failed to generate or save course outline" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
