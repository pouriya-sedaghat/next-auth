import { NextRequest, NextResponse } from "next/server";

import db from "@/utils/db";

import User from "@/models/user.model";

import users from "@/data/users";

export async function GET(request: NextRequest) {
  await db.connect();

  const result = await User.insertMany(users);

  return NextResponse.json(result);
}
