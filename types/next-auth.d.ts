// types/next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the id field here
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string; // Add the id field here as well
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}
