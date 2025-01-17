import NextAuth, { NextAuthConfig, User as UT } from "next-auth";

import Credentials from "next-auth/providers/credentials";

// Comment To Use Of Middleware

// import db from "@/utils/db";

// import User from "@/models/user.model";

import bcrypt from "bcryptjs";

// Use Middleware

import userItems from "@/data/users";

import { NextResponse } from "next/server";

const authOptions: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;

      if (user?.username) token.username = user.username;

      if (user?.isAdmin) token.isAdmin = user.isAdmin;

      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;

      if (token?.username) session.user.username = token.username;

      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;

      return session;
    },

    // Use Middleware

    async authorized({ auth, request }) {
      const isAuthorized = !!auth;

      const isPrivateRoute =
        request.nextUrl.pathname.startsWith("/admin/dashboard");

      const url = new URL(request.nextUrl);

      url.pathname = "/";

      if (!isAuthorized && isPrivateRoute) return NextResponse.redirect(url);

      return true;
    },
  },
  providers: [
    Credentials({
      name: "User",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      // Comment To Use Of Middleware

      // async authorize(credentials): Promise<UT> {
      //   await db.connect();

      //   const user = await User.findOne({ email: credentials.email });

      //   if (
      //     user &&
      //     bcrypt.compareSync(credentials.password as string, user.password)
      //   )
      //     return user;

      //   throw new Error("Invalid Email Or Password, Please Try Again.");
      // },

      // Use Middleware

      async authorize(credentials): Promise<UT> {
        const users: UT[] = userItems;

        const user = users.find((item) => item.email === credentials.email);

        if (
          user &&
          bcrypt.compareSync(credentials.password as string, user.password)
        )
          return user;

        throw new Error("Invalid Email Or Password, Please Try Again.");
      },
    }),
  ],
};

// export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);

export const { handlers, auth } = NextAuth(authOptions);
