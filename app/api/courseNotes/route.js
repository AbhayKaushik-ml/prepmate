import { CHAPTER_NOTES_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";

export async function GET(req) {
    try {
        const reqUrl = req.url;
        const { searchParams } = new URL(reqUrl);
        const courseId = searchParams?.get('courseId');

        if (!courseId) {
            return NextResponse.json({ error: "Missing courseId parameter" }, { status: 400 });
        }

        console.log('Fetching notes for course:', courseId);

        // Query the database for notes related to this course
        const notes = await db.select().from(CHAPTER_NOTES_TABLE)
            .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

        console.log(`Found ${notes.length} notes for course ${courseId}`);

        // Map the database results to a format expected by the frontend
        const formattedNotes = notes.map(note => {
            // Try to parse the notes content if it's a JSON string
            let content = note.notes;
            let title = `Chapter ${parseInt(note.chapterId, 10) + 1} Notes`;
            
            try {
                // Check if it's a JSON string
                if (typeof content === 'string') {
                    // First try to parse as JSON
                    if (content.trim().startsWith('{') || content.trim().startsWith('[')) {
                        const contentObject = JSON.parse(content);
                        
                        // Extract content from various possible JSON structures
                        if (contentObject && contentObject.content) {
                            content = contentObject.content;
                            
                            // If there's a title in the JSON, use it
                            if (contentObject.chapter_title) {
                                title = contentObject.chapter_title;
                            } else if (contentObject.title) {
                                title = contentObject.title;
                            }
                        } else if (contentObject && typeof contentObject === 'object') {
                            // Look for content in any field
                            const possibleContentFields = ['text', 'body', 'data', 'note', 'description'];
                            
                            for (const field of possibleContentFields) {
                                if (contentObject[field] && typeof contentObject[field] === 'string') {
                                    content = contentObject[field];
                                    break;
                                }
                            }
                            
                            // If we still have an object, stringify it
                            if (typeof content === 'object') {
                                content = JSON.stringify(contentObject, null, 2);
                            }
                        }
                    }
                }
                
                // Handle empty or null content
                if (!content || content.trim() === '') {
                    content = '<p>No content available for this chapter.</p>';
                }
                
            } catch (e) {
                console.log('Error processing content:', e);
                // If parsing fails, keep the original string if not empty
                if (!content || content.trim() === '') {
                    content = '<p>No content available for this chapter.</p>';
                }
            }
            
            return {
                chapter_id: parseInt(note.chapterId, 10) || 0,
                title: title,
                content: content
            };
        });

        return NextResponse.json(formattedNotes);
    } catch (error) {
        console.error('Error fetching course notes:', error);
        return NextResponse.json({ 
            error: "Failed to fetch course notes",
            details: error.message 
        }, { status: 500 });
    }
} 