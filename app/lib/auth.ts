import { prisma } from "@/prisma";
import  { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcryptjs";


export const authOptions: NextAuthOptions = {
    session: {
      strategy: "jwt",
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
            console.log("Give Credentials")
            return null;
          }
  
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
  
          if (!user || !(await bcrypt.compare(credentials.password, user.h_password))) {
            console.log("Wrong Credentials")
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
    secret:process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/auth",
    },
  };
  