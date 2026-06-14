import courses from "./courses.ts";
import modules from "./modules.ts";
import assignments from "./assignments.ts";
import users from "./users.ts";
import enrollments from "./enrollments.ts";
import type { Database } from "../types.ts";

const db: Database = { courses, modules, assignments, users, enrollments };

export default db;
