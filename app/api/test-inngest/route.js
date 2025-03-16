import { NextResponse } from "next/server";
import { inngest } from "@/inngest/client";

export async function GET(request) {
  try {
    // Send a test event to Inngest
    const result = await inngest.send({
      name: "test/hello.world",
      data: {
        email: "test-user@example.com"
      }
    });

    console.log("Sent test event to Inngest:", result);
    
    return NextResponse.json({ 
      success: true, 
      message: "Test event sent to Inngest", 
      result 
    });
  } catch (error) {
    console.error("Error sending test event to Inngest:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
} 