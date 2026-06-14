import { v4 as uuidv4 } from "uuid";
import type { Database, Module } from "../types.ts";

export default function ModulesDao(db: Database) {
  function findModulesForCourse(courseId: string): Module[] {
    return db.modules.filter((m) => m.course === courseId);
  }

  function createModule(module: Omit<Module, "_id">): Module {
    const newModule: Module = { ...module, _id: uuidv4() };
    db.modules = [...db.modules, newModule];
    return newModule;
  }

  function updateModule(moduleId: string, moduleUpdates: Partial<Module>): Module | undefined {
    const module = db.modules.find((m) => m._id === moduleId);
    if (module) Object.assign(module, moduleUpdates);
    return module;
  }

  function deleteModule(moduleId: string): void {
    db.modules = db.modules.filter((m) => m._id !== moduleId);
  }

  return { findModulesForCourse, createModule, updateModule, deleteModule };
}
