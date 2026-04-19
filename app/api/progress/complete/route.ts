import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Progress from '@/lib/models/Progress';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { courseSlug, lessonSlug } = await request.json();

    if (!courseSlug || !lessonSlug) {
      return NextResponse.json(
        { error: 'Missing courseSlug or lessonSlug' },
        { status: 400 }
      );
    }

    await connectDB();

    let progress = await Progress.findOne({ 
      userId: session.user.id, 
      courseSlug 
    });

    if (!progress) {
      progress = await Progress.create({
        userId: session.user.id,
        courseSlug,
        completedLessons: [lessonSlug],
        lastAccessedAt: new Date(),
      });
    } else {
      if (!progress.completedLessons.includes(lessonSlug)) {
        progress.completedLessons.push(lessonSlug);
      }
      progress.lastAccessedAt = new Date();
      await progress.save();
    }

    return NextResponse.json({ success: true, progress });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { courseSlug, lessonSlug } = await request.json();

    if (!courseSlug || !lessonSlug) {
      return NextResponse.json(
        { error: 'Missing courseSlug or lessonSlug' },
        { status: 400 }
      );
    }

    await connectDB();

    const progress = await Progress.findOne({ 
      userId: session.user.id, 
      courseSlug 
    });

    if (progress) {
      progress.completedLessons = progress.completedLessons.filter(
        (l: string) => l !== lessonSlug
      );
      await progress.save();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing progress:', error);
    return NextResponse.json(
      { error: 'Failed to remove progress' },
      { status: 500 }
    );
  }
}