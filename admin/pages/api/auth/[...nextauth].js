import NextAuth from "next-auth";
import { v4 as uuidv4 } from "uuid";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../lib/mongodb";
import { encrypt } from "./encryption";

const ONE_HOUR_IN_SECONDS = 60 * 60;

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ username, password }) {
        if (!username || !password) return null;

        try {
          const dbClient = await clientPromise;
          const adminCollection = dbClient.db("high_u").collection("admin");
          const admin = await adminCollection.findOne({ username });
          if (admin && admin.password === password) {
            console.log("Admin authenticated successfully.");
            return {
              id: admin._id.toString(),
              name: admin.username,
              email: admin.email,
              image: admin.image,
            };
          } else {
            console.log("Invalid username or password.");
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
