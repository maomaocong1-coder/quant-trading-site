import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Progress from '@/lib/models/Progress';
import Course from '@/lib/models/Course';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const progress = await Progress.find({ userId: session.user.id })
      .sort({ lastAccessedAt: -1 });

    const coursesWithProgress = await Promise.all(
      progress.map(async (p) => {
        const course = await Course.findOne({ slug: p.courseSlug })
          .select('title slug difficulty estimatedHours modules');
        
        if (!course) return null;

        const totalLessons = course.modules.reduce(
          (acc: number, m: { lessons: unknown[] }) => acc + m.lessons.length,
          0
        );
        const completedCount = p.completedLessons.length;
        const percentage = totalLessons > 0 
          ? Math.round((completedCount / totalLessons) * 100) 
          : 0;

        return {
          courseSlug: p.courseSlug,
          course,
          completedLessons: p.completedLessons,
          completedCount,
          totalLessons,
          percentage,
          lastAccessedAt: p.lastAccessedAt,
        };
      })
    );

    return NextResponse.json(coursesWithProgress.filter(Boolean));
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}