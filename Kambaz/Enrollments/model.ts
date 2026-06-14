import mongoose from "mongoose";
import type { Enrollment } from "../types.ts";

const enrollmentSchema = new mongoose.Schema<Enrollment>({
  _id: String,
  course: { type: String, ref: "CourseModel" },
  user:   { type: String, ref: "UserModel" },
}, { collection: "enrollments", versionKey: false });

export default mongoose.model<Enrollment>("EnrollmentModel", enrollmentSchema);
