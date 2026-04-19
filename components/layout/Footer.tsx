import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quant Trading
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Learn quantitative trading from fundamentals to advanced strategies.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/progress" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm">
                  My Progress
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Quant Trading. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}