import mongoose from "mongoose";
import type { User } from "../types.ts";

const userSchema = new mongoose.Schema<User>({
  _id: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String, lastName: String, email: String, dob: String,
  role: { type: String, enum: ["STUDENT", "FACULTY", "ADMIN", "TA"], default: "STUDENT" },
  loginId: String, section: String, lastActivity: String, totalActivity: String,
}, { collection: "users", versionKey: false });

export default mongoose.model<User>("UserModel", userSchema);
