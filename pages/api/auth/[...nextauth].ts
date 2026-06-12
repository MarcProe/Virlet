import NextAuth, { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'instagram',
      name: 'Instagram',
      type: 'oauth',
      authorization: {
        url: 'https://www.instagram.com/oauth/authorize',
        params: {
          scope: 'instagram_business_basic',
          response_type: 'code',
          enable_fb_login: '0',
          force_authentication: '1',
        },
      },
      token: 'https://api.instagram.com/oauth/access_token',
      userinfo: {
        url: 'https://graph.instagram.com/me',
        params: { fields: 'id,username' },
      },
      profile(profile) {
        return {
          id: profile.id,
          name: profile.username,
          email: null,
          image: null,
        }
      },
      clientId: process.env.INSTAGRAM_CLIENT_ID!,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
    },
  ],
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
