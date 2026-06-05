"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import AccountWidget from "@/components/AccountWidget";
import Image from "next/image";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Virlet
              </h1>
            </div>
            <div className="flex items-center">
              <div className="relative flex-shrink-0 h-8 w-8">
                <Image
                  className="rounded-full object-cover"
                  src={session.user?.image || "https://via.placeholder.com/150"}
                  alt="Profile"
                  fill
                  sizes="32px"
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-900 dark:text-white">
                  {session.user?.name}
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {session.user?.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Dashboard
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Drag and drop widgets here
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <AccountWidget user={session.user} />
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Welcome to Virlet
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                This is your dashboard. Here you can view your Instagram analytics,
                manage your content, and track your performance as a sports creator.
              </p>
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  More widgets coming soon...
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
