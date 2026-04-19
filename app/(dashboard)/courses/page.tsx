import { Metadata } from 'next';
import { connectDB } from '@/lib/db';
import Course from '@/lib/models/Course';
import { CourseCard } from '@/components/course';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Courses - Quant Trading',
  description: 'Browse all quantitative trading courses',
};

export default async function CoursesPage() {
  await connectDB();
  const courses = await Course.find({})
    .select('title slug description difficulty estimatedHours modules')
    .sort({ createdAt: -1 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          All Courses
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Learn quantitative trading from fundamentals to advanced strategies
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No courses available yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course._id.toString()}
              course={JSON.parse(JSON.stringify(course))}
            />
          ))}
        </div>
      )}
    </div>
  );
}