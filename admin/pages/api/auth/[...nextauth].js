import NextAuth from "next-auth";
import { v4 as uuidv4 } from "uuid";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        try {
          const client = await clientPromise;
          const db = client.db("high_u");
          const collection = db.collection("admin");
          const user = await collection.findOne({ email: credentials.email });
          if (user && user.password === credentials.password) {
            console.log("Admin authenticated successfully.");
            return {
              id: user._id.toString(),
              name: user.username,
              email: user.email,
              image: user.image,
              firstname: user.firstname,
              lastname: user.lastname,
              password: user.password,
            };
          } else {
            console.log("Invalid email or password.");
            return null;
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add access token and expiration time to the token object
      console.log("jwt: Original Token:", token);
      if (user) {
        token.accessToken = uuidv4();
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60; // Token will expire in 1 hour
        console.log("jwt: New Token:", token);
      }
      return token;
    },
    async session({ session, token }) {
      // Add access token to the session object
      console.log("session: Session:", session);
      if (token && token.accessToken) {
        session.accessToken = token.accessToken;

        console.log("session: New Session:", session);
      }
      return session;
    },
  },
});
