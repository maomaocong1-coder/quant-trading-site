import Link from 'next/link';
import { Button } from '@/components/ui';

export default function HomePage() {
  const features = [
    {
      title: 'Structured Learning',
      description: 'Progress through well-organized modules from basics to advanced strategies',
      icon: '📚',
    },
    {
      title: 'Interactive Code',
      description: 'Learn with real Python code examples you can run and modify',
      icon: '💻',
    },
    {
      title: 'Track Progress',
      description: 'Mark lessons complete and track your learning journey',
      icon: '📊',
    },
    {
      title: 'Practical Focus',
      description: 'Real-world strategies and backtesting techniques',
      icon: '🎯',
    },
  ];

  const coursesPreview = [
    {
      title: 'Introduction to Quantitative Trading',
      difficulty: 'beginner',
      lessons: 12,
      description: 'Learn the fundamentals of algorithmic trading',
    },
    {
      title: 'Python for Finance',
      difficulty: 'beginner',
      lessons: 15,
      description: 'Master Python tools for financial analysis',
    },
    {
      title: 'Strategy Development',
      difficulty: 'intermediate',
      lessons: 20,
      description: 'Build and test your own trading strategies',
    },
  ];

  return (
    <div>
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Learn <span className="text-blue-600 dark:text-blue-400">Quantitative Trading</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Master algorithmic trading through structured courses, interactive code examples, and practical strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses">
                <Button size="lg">Browse Courses</Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="lg">Get Started Free</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Why Learn With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Featured Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coursesPreview.map((course) => (
              <div 
                key={course.title}
                className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-3 ${
                  course.difficulty === 'beginner' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                }`}>
                  {course.difficulty}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {course.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {course.lessons} lessons
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/courses">
              <Button variant="outline">View All Courses</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-600 dark:bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Start Your Trading Journey Today
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Join thousands of learners mastering quantitative trading strategies
          </p>
          <Link href="/signup">
            <Button variant="secondary" size="lg">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}