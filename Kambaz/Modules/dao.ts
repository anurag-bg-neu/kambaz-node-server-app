import { v4 as uuidv4 } from "uuid";
import type { Module } from "../types.ts";
import ModuleModel from "./model.ts";

export default function ModulesDao() {
  const findModulesForCourse = (courseId: string): Promise<Module[]> =>
    ModuleModel.find({ course: courseId }).lean() as unknown as Promise<Module[]>;

  const createModule = async (module: Omit<Module, "_id">): Promise<Module> => {
    const doc = new ModuleModel({ ...module, _id: uuidv4() });
    return (await doc.save()).toObject() as unknown as Module;
  };

  const updateModule = (moduleId: string, updates: Partial<Module>): Promise<Module | null> =>
    ModuleModel.findByIdAndUpdate(moduleId, { $set: updates }, { new: true }).lean() as Promise<Module | null>;

  const deleteModule = (moduleId: string) => ModuleModel.findByIdAndDelete(moduleId);

  return { findModulesForCourse, createModule, updateModule, deleteModule };
}
