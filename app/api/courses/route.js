import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";

export async function POST(req){
    try {
        const { createdBy } = await req.json();
        
        if (!createdBy) {
            return NextResponse.json({ error: "Missing createdBy parameter" }, { status: 400 });
        }
        
        console.log('Fetching courses for user:', createdBy);
        
        const result = await db.select().from(STUDY_MATERIAL_TABLE)
            .where(eq(STUDY_MATERIAL_TABLE.createdBy, createdBy));
            
        console.log(`Found ${result.length} courses`);
        return NextResponse.json({ result: result });
    } catch (error) {
        console.error('Error fetching courses:', error);
        return NextResponse.json({ 
            error: "Failed to fetch courses",
            details: error.message 
        }, { status: 500 });
    }
}

export async function GET(req){
    const reqUrl=req.url;
    const {searchParams}= new URL(reqUrl);
    const courseId=searchParams?.get('courseId');


    const course=await db.select().from(STUDY_MATERIAL_TABLE)
        .where(eq(STUDY_MATERIAL_TABLE?.courseId,courseId));


    return NextResponse.json({resourse:course[0]});
}