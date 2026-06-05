'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getUserById, upsertUser } from '@/lib/db';
import { User } from '@/types';
import DashboardLayout from '@/components/DashboardLayout';
import AccountInfoWidget from '@/components/widgets/AccountInfoWidget';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (status === 'unauthenticated') {
        router.push('/login');
        return;
      }

      if (status === 'authenticated' && session?.user?.id) {
        try {
          // Get user from database
          const dbUser = await getUserById(session.user.id);
          
          if (dbUser) {
            setUser(dbUser);
          } else {
            // Create a new user record if it doesn't exist
            const newUser: User = {
              id: session.user.id,
              email: session.user.email || '',
              name: session.user.name || '',
              username: session.user.username || '',
              bio: '',
              profileImage: session.user.image || undefined,
              followersCount: 0,
              followingCount: 0,
              postsCount: 0,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            await upsertUser(newUser);
            setUser(newUser);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserData();
  }, [session, status, router]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-dark-1000 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-1000 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            No user data found
          </h2>
          <button
            onClick={() => router.push('/login')}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="neumorphic p-6">
          <h1 className="text-2xl font-bold text-white">
            Welcome back, {user.name || user.username}!
          </h1>
          <p className="text-gray-400 mt-1">
            Here's your Instagram analytics dashboard
          </p>
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Account Info Widget */}
          <AccountInfoWidget user={user} showStats={true} />

          {/* Placeholder for future widgets */}
          <div className="neumorphic p-6 text-center">
            <div className="text-gray-500 text-sm">
              More widgets coming soon...
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
