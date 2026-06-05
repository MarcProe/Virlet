'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { DashboardLayoutProps } from '@/types';

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-dark-1000">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-dark-900 w-64 transform transition-transform duration-300 ease-in-out z-40 md:translate-x-0 md:static md:z-auto ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-dark-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">V</span>
            </div>
            <span className="text-white font-bold text-lg">Virlet</span>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:bg-dark-800 hover:text-white rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:bg-dark-800 hover:text-white rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:bg-dark-800 hover:text-white rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Analytics</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:bg-dark-800 hover:text-white rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Growth</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-700">
          {session?.user && (
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={session.user.image || '/placeholder.jpg'}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="text-white font-semibold text-sm">{session.user.name}</div>
                <div className="text-gray-400 text-xs">@{session.user.username}</div>
              </div>
            </div>
          )}
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        />
      )}

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ease-in-out md:ml-64 p-4 md:p-6 ${
          isSidebarOpen ? 'ml-0' : 'ml-0 md:ml-64'
        }`}
      >
        {children}
      </main>
    </div>
  );
}
