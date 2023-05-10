import NextAuth from "next-auth";
import { v4 as uuidv4 } from "uuid";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../lib/mongodb";
import { encrypt, encryption } from "./encryption.js";

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
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Encrypt and store the access token in the session
      if (token && token.accessToken) {
        const encryptedToken = await encrypt(token.accessToken);
        session.accessToken = encryptedToken;
      }
      return session;
    },
  },
});
