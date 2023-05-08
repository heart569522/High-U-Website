import NextAuth from "next-auth";
import { v4 as uuidv4 } from "uuid";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../lib/mongodb";

const ONE_HOUR_IN_SECONDS = 60 * 60;

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ email, password }) {
        if (!email || !password) return null;

        try {
          const dbClient = await clientPromise;
          const userCollection = dbClient.db("high_u").collection("member");
          const user = await userCollection.findOne({ email });
          if (user && user.password === password) {
            console.log("User authenticated successfully.");
            return {
              id: user._id.toString(),
              name: user.username,
              email: user.email,
              image: user.image,
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
      console.log("jwt: Original Token:", token);
      if (user) {
        token.accessToken = uuidv4();
        token.exp = Math.floor(Date.now() / 1000) + ONE_HOUR_IN_SECONDS;
        console.log("jwt: New Token:", token);
      }
      return token;
    },
    async session({ session, token }) {
      console.log("session: Session:", session);
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
        console.log("session: New Session:", session);
      }
      return session;
    },
  },
});
