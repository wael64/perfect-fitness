import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'

import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '../../../utils/mongodb'

export default NextAuth({
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER!,
      from: process.env.EMAIL_FROM!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // GoogleProvider({})
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token, user }) {
      const newSession: any = session
      newSession.user.id = token.id
      return newSession
    },
  },
})
