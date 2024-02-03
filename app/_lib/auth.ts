import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";

import { db } from "@/app/_lib/prisma";
import { AuthOptions } from "next-auth";


export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    callbacks: {
      async session({ session, user }) {
        session.user = { ...session.user, id: user.id } as {
          id: string;
          name: string;
          email: string;
        };
  
        return session;
      },
    },
    secret: process.env.NEXT_AUTH_SECRET,
  };