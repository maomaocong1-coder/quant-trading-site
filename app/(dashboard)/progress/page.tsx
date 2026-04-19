'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ProgressBar } from '@/components/ui';

interface ProgressItem {
  courseSlug: string;
  course: {
    title: string;
    slug: string;
    difficulty: string;
    estimatedHours: number;
    modules: { lessons: unknown[] }[];
  };
  completedLessons: string[];
  completedCount: number;
  totalLessons: number;
  percentage: number;
  lastAccessedAt: string;
}

export default function ProgressPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!session?.user?.id) return;
      
      try {
        const res = await fetch('/api/user/progress');
        if (res.ok) {
          const data = await res.json();
          setProgress(data);
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchProgress();
    }
  }, [session]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Progress
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Track your learning journey across all courses
        </p>
      </div>

      {progress.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You haven&apos;t started any courses yet.
          </p>
          <Link 
            href="/courses"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Browse Courses →
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {progress.map((item) => (
            <div 
              key={item.courseSlug}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.course.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded ${
                      item.course.difficulty === 'beginner'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : item.course.difficulty === 'intermediate'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {item.course.difficulty}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {item.course.estimatedHours} hours
                    </span>
                  </div>
                </div>
                <Link
                  href={`/courses/${item.courseSlug}`}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm"
                >
                  Continue →
                </Link>
              </div>

              <ProgressBar value={item.percentage} showLabel size="md" />

              <div className="flex items-center justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
                <span>{item.completedCount} of {item.totalLessons} lessons completed</span>
                <span>Last accessed: {new Date(item.lastAccessedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}