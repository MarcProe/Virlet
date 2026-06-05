"use client";

import { Session } from "next-auth";

export default function AccountWidget({ user }: { user: Session["user"] }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Account Information
        </h3>
        <span className="text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/20 px-2 py-1 rounded-full">
          Widget
        </span>
      </div>

      <div className="flex flex-col items-center">
        <img
          className="h-20 w-20 rounded-full mb-4"
          src={user?.image || "https://via.placeholder.com/150"}
          alt="Profile"
        />

        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
          {user?.name || "Unknown"}
        </h4>

        {user?.email && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {user.email}
          </p>
        )}

        {user?.bio && (
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-6">
            {user.bio}
          </p>
        )}

        <div className="w-full grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {user?.posts || 0}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Posts
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {user?.followers?.toLocaleString() || "0"}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Followers
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {user?.following?.toLocaleString() || "0"}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Following
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
