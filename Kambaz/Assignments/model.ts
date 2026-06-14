import mongoose from "mongoose";
import type { Assignment } from "../types.ts";

const assignmentSchema = new mongoose.Schema<Assignment>({
  _id: String, title: String,
  course: { type: String, ref: "CourseModel" },
  description: String, points: Number,
  dueDate: String, availableDate: String, untilDate: String,
}, { collection: "assignments", versionKey: false });

export default mongoose.model<Assignment>("AssignmentModel", assignmentSchema);
