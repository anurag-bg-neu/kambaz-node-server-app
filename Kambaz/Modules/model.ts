import mongoose from "mongoose";
import type { Module } from "../types.ts";

const moduleSchema = new mongoose.Schema<Module>({
  _id: String, name: String, description: String,
  course: String, editing: Boolean,
  lessons: [{ _id: String, name: String, description: String, module: String }],
}, { collection: "modules", versionKey: false });

export default mongoose.model<Module>("ModuleModel", moduleSchema);
