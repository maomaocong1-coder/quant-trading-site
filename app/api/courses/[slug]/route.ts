import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Course from '@/lib/models/Course';
import Lesson from '@/lib/models/Lesson';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectDB();
    
    const course = await Course.findOne({ slug });
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const lessons = await Lesson.find({ courseSlug: slug })
      .select('title slug moduleIndex order')
      .sort({ moduleIndex: 1, order: 1 });
    
    return NextResponse.json({ course, lessons });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}