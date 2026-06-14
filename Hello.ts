import type { Express, Request, Response } from "express";

export default function Hello(app: Express): void {
  app.get("/hello", (_req: Request, res: Response): void => {
    res.send("Life is good!");
  });

  app.get("/", (_req: Request, res: Response): void => {
    res.send("Welcome to Full Stack Development!");
  });
}
