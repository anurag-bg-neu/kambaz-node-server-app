import type { Express, Request, Response } from "express";
import PathParameters from "./PathParameters.ts";
import QueryParameters from "./QueryParameters.ts";
import WorkingWithObjects from "./WorkingWithObjects.ts";
import WorkingWithArrays from "./WorkingWithArrays.ts";

export default function Lab5(app: Express): void {
  app.get("/lab5/welcome", (_req: Request, res: Response): void => {
    res.send("Welcome to Lab 5");
  });
  PathParameters(app);
  QueryParameters(app);
  WorkingWithObjects(app);
  WorkingWithArrays(app);
}
