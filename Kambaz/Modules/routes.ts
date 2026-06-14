import type { Express, Request, Response } from "express";
import type { Database } from "../types.ts";
import ModulesDao from "./dao.ts";

export default function ModulesRoutes(app: Express, db: Database): void {
  const dao = ModulesDao(db);

  const findModulesForCourse = (req: Request, res: Response): void => {
    res.json(dao.findModulesForCourse(req.params.courseId as string));
  };

  const createModuleForCourse = (req: Request, res: Response): void => {
    const module = { ...req.body, course: req.params.courseId as string };
    res.send(dao.createModule(module));
  };

  const updateModule = (req: Request, res: Response): void => {
    res.send(dao.updateModule(req.params.moduleId as string, req.body));
  };

  const deleteModule = (req: Request, res: Response): void => {
    dao.deleteModule(req.params.moduleId as string);
    res.sendStatus(200);
  };

  app.put("/api/modules/:moduleId", updateModule);
  app.delete("/api/modules/:moduleId", deleteModule);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.get("/api/courses/:courseId/modules", findModulesForCourse);
}
