import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';

interface CourseCardProps {
  course: {
    _id: string;
    title: string;
    slug: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedHours: number;
    modules: { lessons: unknown[] }[];
    image?: string;
  };
  progress?: {
    completedLessons: string[];
    percentage: number;
  };
}

export default function CourseCard({ course, progress }: CourseCardProps) {
  const totalLessons = course.modules.reduce(
    (acc: number, m: { lessons: unknown[] }) => acc + m.lessons.length,
    0
  );

  const difficultyColors = {
    beginner: 'success',
    intermediate: 'warning',
    advanced: 'error',
  } as const;

  return (
    <Link href={`/courses/${course.slug}`}>
      <Card hover className="h-full">
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <Badge variant={difficultyColors[course.difficulty]}>
              {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}
            </Badge>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {course.estimatedHours}h
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {course.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {course.description}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
            <span>{totalLessons} lessons</span>
            <span>{course.modules.length} modules</span>
          </div>
          {progress && (
            <div className="mt-4">
              <ProgressBar 
                value={progress.percentage} 
                showLabel 
                size="sm"
              />
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}