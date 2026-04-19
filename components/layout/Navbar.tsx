'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  const navLinks = [
    { href: '/courses', label: 'Courses' },
    { href: '/progress', label: 'My Progress' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              Quant Trading
            </Link>
            <div className="hidden md:flex ml-10 space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === link.href
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
            ) : session ? (
              <>
                <Link
                  href="/profile"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  {session.user?.name}
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}