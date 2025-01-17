import { Session } from "next-auth";

import { JWT } from "next-auth/jwt";

import mongoose from "mongoose";

declare module "next-auth" {
  interface Session {
    // _id: mongoose.Schema.Types.ObjectId;
    _id: number;
    username: string;
    email: string;
    isAdmin: boolean;
  }

  interface User {
    // _id: mongoose.Schema.Types.ObjectId;
    _id: number;
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    // _id: mongoose.Schema.Types.ObjectId;
    _id: number;
    username: string;
    email: string;
    isAdmin: boolean;
  }
}
