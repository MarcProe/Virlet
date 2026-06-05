import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig = {
  providers: [
    // Using GitHub as a simple OAuth provider for demo purposes
    // In production, you'd want to use Instagram OAuth
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    // Simple credentials provider for demo
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // In a real app, you'd validate against a database
        // For demo purposes, we'll use a simple hardcoded user
        if (
          credentials?.username === "demo" &&
          credentials?.password === "demo123"
        ) {
          return {
            id: "1",
            name: "Demo User",
            email: "demo@example.com",
            image: "https://via.placeholder.com/150",
            bio: "Sports content creator",
            followers: 15000,
            following: 250,
            posts: 125,
          };
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
        // Add custom fields
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
  }
}
