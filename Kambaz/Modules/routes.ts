import type { Express, Request, Response } from "express";
import ModulesDao from "./dao.ts";

export default function ModulesRoutes(app: Express): void {
  const dao = ModulesDao();

  const findModulesForCourse = async (req: Request, res: Response): Promise<void> => {
    res.json(await dao.findModulesForCourse(req.params.courseId as string));
  };

  const createModuleForCourse = async (req: Request, res: Response): Promise<void> => {
    const module = { ...req.body, course: req.params.courseId as string };
    res.json(await dao.createModule(module));
  };

  const updateModule = async (req: Request, res: Response): Promise<void> => {
    res.json(await dao.updateModule(req.params.moduleId as string, req.body));
  };

  const deleteModule = async (req: Request, res: Response): Promise<void> => {
    await dao.deleteModule(req.params.moduleId as string);
    res.sendStatus(200);
  };

  app.put("/api/courses/:courseId/modules/:moduleId", updateModule);
  app.delete("/api/courses/:courseId/modules/:moduleId", deleteModule);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.get("/api/courses/:courseId/modules", findModulesForCourse);
}
