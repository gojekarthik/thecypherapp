import { prisma } from "@/app/lib";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserIdByEmail } from "./getUserbyEmail"; // Import your helper function
import * as bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", // Use JWT for session handling
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          console.log("Provide credentials");
          return null;
        }

        // Use getUserIdByEmail to fetch the user
        const userId = await getUserIdByEmail(credentials.email);

        if (!userId) {
          console.log("User not found");
          return null;
        }

        // Fetch user details by ID
        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });

        if (
          !user ||
          !(await bcrypt.compare(credentials.password, user.h_password))
        ) {
          console.log("Wrong credentials");
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth", 
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};
