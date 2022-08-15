import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'

import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '../../../utils/mongodb'

import mongooseConnect from '../../../utils/mongooseConnect'
import User from '../../../models/User'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

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
    maxAge: 60 * 60 * 24 * 3,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        if (isNewUser) {
          await mongooseConnect()
          const stripeCustomer = await stripe.customers.create()
          await User.updateOne(
            { email: profile?.email || token?.email },
            { stripeCustomerId: stripeCustomer?.id }
          )
          user.stripeCustomerId = stripeCustomer?.id
        }

        token.id = user.id
        token.stripeCustomerId = user.stripeCustomerId
      }
      return token
    },
    async session({ session, token, user }) {
      const newSession: any = session
      newSession.user.id = token.id
      newSession.user.stripeCustomerId = token.stripeCustomerId
      return newSession
    },
  },
})
