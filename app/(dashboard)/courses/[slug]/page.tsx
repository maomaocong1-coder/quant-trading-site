import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { connectDB } from '@/lib/db';
import Course from '@/lib/models/Course';
import Lesson from '@/lib/models/Lesson';
import { auth } from '@/lib/auth';
import Progress from '@/lib/models/Progress';
import { Badge } from '@/components/ui';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const course = await Course.findOne({ slug }).select('title description');
  
  if (!course) return { title: 'Course Not Found' };
  
  return {
    title: `${course.title} - Quant Trading`,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();
  
  const course = await Course.findOne({ slug });
  if (!course) notFound();

  const lessons = await Lesson.find({ courseSlug: slug })
    .select('title slug moduleIndex order')
    .sort({ moduleIndex: 1, order: 1 });

  const session = await auth();
  let completedLessons: string[] = [];
  
  if (session?.user?.id) {
    const progress = await Progress.findOne({
      userId: session.user.id,
      courseSlug: slug,
    });
    completedLessons = progress?.completedLessons || [];
  }

  const totalLessons = course.modules.reduce(
    (acc: number, m: { lessons: unknown[] }) => acc + m.lessons.length,
    0
  );
  const completedCount = completedLessons.length;
  const percentage = totalLessons > 0 
    ? Math.round((completedCount / totalLessons) * 100) 
    : 0;

  const firstLesson = lessons[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant={course.difficulty === 'beginner' ? 'success' : course.difficulty === 'intermediate' ? 'warning' : 'error'}>
            {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}
          </Badge>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {course.estimatedHours} estimated hours
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {course.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {course.description}
        </p>

        {session && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Progress
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {completedCount} / {totalLessons} lessons
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-right text-sm text-gray-600 dark:text-gray-400 mt-1">
              {percentage}%
            </p>
          </div>
        )}

        {firstLesson && (
          <Link 
            href={`/courses/${slug}/${firstLesson.slug}`}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Start Learning
          </Link>
        )}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Course Content
        </h2>
        
        {course.modules.map((module: { title: string; order: number; lessons: { title: string; slug: string; order: number }[] }, moduleIndex: number) => (
          <div key={moduleIndex} className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Module {moduleIndex + 1}: {module.title}
            </h3>
            <ul className="space-y-2">
              {module.lessons.sort((a, b) => a.order - b.order).map((lesson) => {
                const isCompleted = completedLessons.includes(lesson.slug);
                
                return (
                  <li key={lesson.slug}>
                    <Link
                      href={`/courses/${slug}/${lesson.slug}`}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <span className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                        isCompleted 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'border-gray-300 dark:border-gray-600 group-hover:border-blue-500'
                      }`}>
                        {isCompleted && (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </span>
                      <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {lesson.title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}