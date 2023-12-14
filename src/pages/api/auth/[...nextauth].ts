import { Todo } from "@/lib/types";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { AuthOptions, Session, Token, User } from "next-auth";
import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user?.id) {
        token.id = user.id;
        token.todos = await prisma.todo.findMany({
          where: {
            userId: user.id,
          },
        });
      }
      return token;
    },
    session({
      session,
      token,
      user,
    }: {
      session: Session;
      token: Token;
      user: User;
    }) {
      console.log(token, "token");
      session.user.id = token.id;
      session.user.todos = token.todos;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new-user", // New users will be directed here on first sign in
  },
  adapter: PrismaAdapter(prisma),
} as AuthOptions;

export default nextAuth(authOptions);
