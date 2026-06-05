import NextAuth from 'next-auth';
import Instagram from 'next-auth/providers/instagram';
import { upsertUser, getUserByEmail } from './db';
import { User } from '@/types';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Instagram({
      clientId: process.env.INSTAGRAM_CLIENT_ID as string,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: 'user_profile,user_media',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, profile, account }) {
      // Initial sign in - create user in database
      if (profile && account) {
        const now = new Date().toISOString();
        
        const userData: User = {
          id: profile.id,
          email: profile.email || `${profile.username}@instagram.com`,
          name: profile.name || profile.username,
          username: profile.username,
          bio: '',
          profileImage: profile.picture || profile.image_url,
          followersCount: 0,
          followingCount: 0,
          postsCount: 0,
          instagramId: profile.id,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          tokenExpiresAt: account.expires_at ? new Date(account.expires_at * 1000).toISOString() : undefined,
          createdAt: now,
          updatedAt: now,
        };
        
        // Store user in database
        await upsertUser(userData);
        
        // Add user data to token
        token.user = {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          username: userData.username,
          image: userData.profileImage,
        };
      }
      
      return token;
    },
    
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
    
    async signIn({ user, account, profile }) {
      // Allow sign in for all Instagram users
      return true;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

// Get current user from session
export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}
