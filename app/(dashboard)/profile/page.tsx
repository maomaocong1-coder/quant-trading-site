'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
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
      <div className="max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Profile
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Name
              </label>
              <p className="mt-1 text-gray-900 dark:text-white">
                {session.user?.name}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Email
              </label>
              <p className="mt-1 text-gray-900 dark:text-white">
                {session.user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}