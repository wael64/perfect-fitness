import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      _id: string
      image: string
      name: string
      email: string
      image: string
      stripeCustomerId: string
      membershipExpire: number
      subscriptionId: string
    }
  }
}
