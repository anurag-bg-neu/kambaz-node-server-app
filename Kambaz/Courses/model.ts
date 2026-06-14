import mongoose from "mongoose";
import type { Course } from "../types.ts";

const courseSchema = new mongoose.Schema<Course>({
  _id: String, name: String, number: String,
  startDate: String, endDate: String,
  department: String, credits: Number,
  description: String, author: String,
}, { collection: "courses", versionKey: false });

export default mongoose.model<Course>("CourseModel", courseSchema);
