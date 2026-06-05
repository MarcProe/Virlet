import type { NextAuthOptions } from "next-auth";
import InstagramProvider from "next-auth/providers/instagram";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig = {
  providers: [
    InstagramProvider({
      clientId: process.env.META_INSTAGRAM_CLIENT_ID || "",
      clientSecret: process.env.META_INSTAGRAM_CLIENT_SECRET || "",
      authorization: {
        url: "https://api.instagram.com/oauth/authorize",
        params: {
          scope: "user_profile user_media",
        },
      },
    }),
    // Add CredentialsProvider for debug login
    CredentialsProvider({
      name: "Debug",
      credentials: {},
      async authorize(credentials) {
        // If the user object is passed, return it directly
        if (credentials?.user) {
          return credentials.user as any;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name || "";
        token.email = user.email || "";
        token.picture = user.image || "";
        token.accessToken = user.accessToken;
        // Add custom fields (if available from Instagram)
        if ("bio" in user && user.bio) {
          token.bio = user.bio;
        }
        if ("followers" in user && user.followers) {
          token.followers = user.followers;
        }
        if ("following" in user && user.following) {
          token.following = user.following;
        }
        if ("posts" in user && user.posts) {
          token.posts = user.posts;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string | undefined;
        session.user.accessToken = token.accessToken as string | undefined;
        // Add custom fields to session
        session.user.bio = token.bio as string | undefined;
        session.user.followers = token.followers as number | undefined;
        session.user.following = token.following as number | undefined;
        session.user.posts = token.posts as number | undefined;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthOptions;

// Extend the types to include custom fields
declare module "next-auth" {
  interface User {
    bio?: string;
    followers?: number;
    following?: number;
    posts?: number;
    accessToken?: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      bio?: string;
      followers?: number;
      following?: number;
      posts?: number;
      accessToken?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    picture: string;
    bio?: string;
    followers?: number;
    following?: number;
    posts?: number;
    accessToken?: string;
  }
}