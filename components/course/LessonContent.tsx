'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

interface LessonContentProps {
  lesson: {
    _id: string;
    title: string;
    content: string;
    codeExamples?: {
      title: string;
      language: string;
      code: string;
      explanation: string;
    }[];
    resources?: {
      title: string;
      url: string;
      type: string;
    }[];
  };
  navigation?: {
    prev: { slug: string; title: string } | null;
    next: { slug: string; title: string } | null;
  };
  courseSlug: string;
  isCompleted: boolean;
  onMarkComplete: () => void;
  onMarkIncomplete: () => void;
}

export default function LessonContent({
  lesson,
  navigation,
  courseSlug,
  isCompleted,
  onMarkComplete,
  onMarkIncomplete,
}: LessonContentProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <article className="max-w-3xl mx-auto px-6 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {lesson.title}
          </h1>
          <div className="flex items-center gap-4">
            <Button
              onClick={isCompleted ? onMarkIncomplete : onMarkComplete}
              variant={isCompleted ? 'outline' : 'primary'}
              size="sm"
            >
              {isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
            </Button>
            {isCompleted && (
              <span className="text-green-600 dark:text-green-400 text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Completed
              </span>
            )}
          </div>
        </header>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {lesson.content}
          </div>
        </div>

        {lesson.codeExamples && lesson.codeExamples.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Code Examples
            </h2>
            <div className="space-y-6">
              {lesson.codeExamples.map((example, index) => (
                <div key={index} className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                    <span className="text-sm text-gray-300">{example.title}</span>
                    <button
                      onClick={() => copyCode(example.code)}
                      className="text-gray-400 hover:text-white text-sm"
                    >
                      {copiedCode === example.code ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto">
                    <code className="text-sm text-gray-100">{example.code}</code>
                  </pre>
                  {example.explanation && (
                    <p className="px-4 py-3 text-sm text-gray-300 bg-gray-800/50 border-t border-gray-700">
                      {example.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {lesson.resources && lesson.resources.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Resources
            </h2>
            <ul className="space-y-2">
              {lesson.resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {resource.title}
                  </a>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    ({resource.type})
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {navigation && (navigation.prev || navigation.next) && (
          <nav className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between">
              {navigation.prev ? (
                <a
                  href={`/courses/${courseSlug}/${navigation.prev.slug}`}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  ← {navigation.prev.title}
                </a>
              ) : (
                <div />
              )}
              {navigation.next ? (
                <a
                  href={`/courses/${courseSlug}/${navigation.next.slug}`}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  {navigation.next.title} →
                </a>
              ) : (
                <div />
              )}
            </div>
          </nav>
        )}
      </article>
    </div>
  );
}