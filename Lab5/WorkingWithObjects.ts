import type { Express, Request, Response } from "express";

const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

const module = {
  id: 101,
  name: "Node Server Module",
  description: "Implementing Node Server from scratch",
  course: "RS101",
};

export default function WorkingWithObjects(app: Express): void {
  app.get("/lab5/assignment", (_req: Request, res: Response): void => {
    res.json(assignment);
  });

  app.get("/lab5/assignment/title", (_req: Request, res: Response): void => {
    res.json(assignment.title);
  });

  app.get("/lab5/assignment/title/:newTitle", (req: Request, res: Response): void => {
    assignment.title = req.params.newTitle as string;
    res.json(assignment);
  });

  app.get("/lab5/module", (_req: Request, res: Response): void => {
    res.json(module);
  });

  app.get("/lab5/module/name", (_req: Request, res: Response): void => {
    res.json(module.name);
  });
}
