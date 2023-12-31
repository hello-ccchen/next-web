import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
