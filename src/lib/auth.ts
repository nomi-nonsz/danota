
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { CredentialsSignin, NextAuthConfig } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid Credentials";
  message = "Invalid Credentials";
  name = "Login failed";
}

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env["GOOGLE_CLIENT_ID"] as string,
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"] as string
    }),
    FacebookProvider({
      clientId: process.env["FACEBOOK_CLIENT_ID"] as string,
      clientSecret: process.env["FACEBOOK_CLIENT_SECRET"] as string
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        console.log("Logging in...");

        if (!credentials?.email || !credentials?.password) {
          throw new InvalidLoginError();
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });
        const hashedPassword: string = user ? user.hash || '' : '';
        const isCorrectPassword = await bcrypt.compare(credentials.password as string, hashedPassword);

        if (!isCorrectPassword) {
          throw new InvalidLoginError();
        }

        return user;
      }
    })
  ],
  pages: {
    signIn: '/signup',
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
}

export const getSession = () => auth().catch(() => null);

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);