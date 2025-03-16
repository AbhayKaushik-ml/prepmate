import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { USER_TABLE } from '@/configs/schema';

// Endpoint to get or create a user
export async function POST(request) {
  try {
    // Get request body data first
    const { clerkId, email, name } = await request.json();
    
    // Validate request
    if (!email) {
      return NextResponse.json({ error: 'Missing required email field' }, { status: 400 });
    }
    
    console.log('Processing user data:', { clerkId, email, name });
    
    // Check if user already exists
    let existingUser = await db.select().from(USER_TABLE).where(eq(USER_TABLE.email, email)).limit(1);
    
    if (existingUser.length === 0) {
      console.log('Creating new user in database');
      // Create new user
      const newUser = await db.insert(USER_TABLE).values({
        name: name || email.split('@')[0],
        email,
        isMember: false, // Default to free tier
      }).returning();
      
      console.log('New user created:', newUser[0]);
      return NextResponse.json(newUser[0], { status: 201 });
    }
    
    console.log('User already exists:', existingUser[0]);
    // Return existing user
    return NextResponse.json(existingUser[0], { status: 200 });
  } catch (error) {
    console.error('Error in user API:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}

// Endpoint to get user by ID
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get('clerkId');
    
    if (!email) {
      return NextResponse.json({ error: 'Missing email parameter' }, { status: 400 });
    }
    
    // Look up user by email
    const dbUser = await db.select().from(USER_TABLE).where(eq(USER_TABLE.email, decodeURIComponent(email))).limit(1);
    
    if (dbUser.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json(dbUser[0], { status: 200 });
  } catch (error) {
    console.error('Error in user API:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
} 