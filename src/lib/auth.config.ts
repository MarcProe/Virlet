import type { NextAuthOptions } from "next-auth";
import InstagramProvider from "next-auth/providers/instagram";

export const authConfig = {
  providers: [
    InstagramProvider({
      clientId: process.env.META_INSTAGRAM_CLIENT_ID!,
      clientSecret: process.env.META_INSTAGRAM_CLIENT_SECRET!,
      authorization: {
        url: "https://api.instagram.com/oauth/authorize",
        params: { scope: "user_profile user_media" },
      },
    }),
  ],
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name || "";
        token.email = user.email || "";
        token.picture = user.image || "";
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string | undefined;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;
