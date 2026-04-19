import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Course from '@/lib/models/Course';

export async function GET() {
  try {
    await connectDB();
    const courses = await Course.find({})
      .select('title slug description difficulty estimatedHours image modules')
      .sort({ createdAt: -1 });
    
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}