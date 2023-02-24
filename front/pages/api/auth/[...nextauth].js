import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  pages: {
    signIn: '/user/SignIn'
  },
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        const res = await fetch("http://localhost:3000/api/auth/user_signin", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const data = await res.json()

        // If no error and we have user data, return it
        if (data.status == 'ok') {
          return data.user
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
  secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",
  // callbacks: {
  //   async jwt({ token, user, account }) {
  //     // Persist the OAuth access_token to the token right after signin
  //     console.log(user);
      
  //     if (account) {
  //       token.accessToken = account.access_token
  //       token.user = user
  //     }
  //     return token
  //   },
  //   async session({ session, token, user }) {
  //     // Send properties to the client, like an access_token from a provider.
  //     session.accessToken = token.accessToken
  //     session.user = token.user
  //     return session
  //   }
  // }
})