import mongoose, { Document } from "mongoose";

import { User as UT } from "@/interface/User";

interface UserSchema extends UT, Document {}

const userSchema = new mongoose.Schema<UserSchema>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});

const User =
  mongoose.models.User || mongoose.model<UserSchema>("User", userSchema);

export default User;
