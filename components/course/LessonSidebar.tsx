import Link from 'next/link';

interface LessonSidebarProps {
  courseSlug: string;
  modules: {
    _id: string;
    title: string;
    order: number;
    lessons: {
      _id: string;
      title: string;
      slug: string;
      order: number;
    }[];
  }[];
  currentLessonSlug?: string;
  completedLessons?: string[];
}

export default function LessonSidebar({ 
  courseSlug, 
  modules, 
  currentLessonSlug, 
  completedLessons = [] 
}: LessonSidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Course Content
        </h2>
        <nav className="space-y-1">
          {modules
            .sort((a, b) => a.order - b.order)
            .map((module) => (
              <div key={module._id} className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {module.title}
                </h3>
                <ul className="space-y-1">
                  {module.lessons
                    .sort((a, b) => a.order - b.order)
                    .map((lesson) => {
                      const isCompleted = completedLessons.includes(lesson.slug);
                      const isCurrent = lesson.slug === currentLessonSlug;
                      
                      return (
                        <li key={lesson._id}>
                          <Link
                            href={`/courses/${courseSlug}/${lesson.slug}`}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                              isCurrent
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
                            }`}
                          >
                            <span className={`w-4 h-4 flex items-center justify-center rounded-full border ${
                              isCompleted
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'border-gray-300 dark:border-gray-600'
                            }`}>
                              {isCompleted && (
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </span>
                            <span className="truncate">{lesson.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}
        </nav>
      </div>
    </aside>
  );
}