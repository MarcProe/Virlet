'use client';

import { AccountInfoWidgetProps } from '@/types';

export default function AccountInfoWidget({ user, showStats = true }: AccountInfoWidgetProps) {
  return (
    <div className="neumorphic p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Account Information</h2>
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>

      {/* Profile Header */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user.profileImage || '/placeholder.jpg'}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover border-2 border-primary-500"
        />
        <div className="flex-1 min-w-0">
          <div className="text-white font-bold text-lg truncate">
            {user.name || user.username}
          </div>
          <div className="text-gray-400 text-sm">
            @{user.username}
          </div>
        </div>
      </div>

      {/* Bio */}
      {user.bio && (
        <div className="mb-6">
          <p className="text-gray-300 text-sm">{user.bio}</p>
        </div>
      )}

      {/* Stats Grid */}
      {showStats && (
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="neumorphic-inset p-3">
            <div className="text-2xl font-bold text-primary-400">
              {user.postsCount.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 mt-1">Posts</div>
          </div>
          <div className="neumorphic-inset p-3">
            <div className="text-2xl font-bold text-primary-400">
              {user.followersCount.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 mt-1">Followers</div>
          </div>
          <div className="neumorphic-inset p-3">
            <div className="text-2xl font-bold text-primary-400">
              {user.followingCount.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 mt-1">Following</div>
          </div>
        </div>
      )}

      {/* Additional Info */}
      <div className="mt-6 pt-4 border-t border-dark-700 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Email</span>
          <span className="text-white truncate max-w-[150px]">{user.email}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Account Type</span>
          <span className="text-white">Creator</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Member Since</span>
          <span className="text-white">
            {new Date(user.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
