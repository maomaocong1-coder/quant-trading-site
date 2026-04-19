import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Lesson from '@/lib/models/Lesson';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string; lessonSlug: string }> }
) {
  try {
    const { slug, lessonSlug } = await params;
    await connectDB();
    
    const lesson = await Lesson.findOne({ 
      courseSlug: slug, 
      slug: lessonSlug 
    });

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    const allLessons = await Lesson.find({ courseSlug: slug })
      .select('title slug moduleIndex order')
      .sort({ moduleIndex: 1, order: 1 });
    
    const currentIndex = allLessons.findIndex(l => l.slug === lessonSlug);
    const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
    const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
    
    return NextResponse.json({ 
      lesson, 
      navigation: { prev: prevLesson, next: nextLesson }
    });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lesson' },
      { status: 500 }
    );
  }
}