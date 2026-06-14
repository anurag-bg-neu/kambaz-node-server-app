import type { Express, Request, Response } from "express";
import type { Database } from "../types.ts";
import EnrollmentsDao from "./dao.ts";

export default function EnrollmentsRoutes(app: Express, db: Database): void {
  const dao = EnrollmentsDao(db);

  const findEnrollmentsForUser = (req: Request, res: Response): void => {
    let userId = req.params.userId as string;
    if (userId === "current") {
      const currentUser = req.session.currentUser;
      if (!currentUser) { res.sendStatus(401); return; }
      userId = currentUser._id;
    }
    res.json(dao.findEnrollmentsForUser(userId));
  };

  const enrollUserInCourse = (req: Request, res: Response): void => {
    let userId = req.params.userId as string;
    const courseId = req.params.courseId as string;
    if (userId === "current") {
      const currentUser = req.session.currentUser;
      if (!currentUser) { res.sendStatus(401); return; }
      userId = currentUser._id;
    }
    res.send(dao.enrollUserInCourse(userId, courseId));
  };

  const unEnrollUserFromCourse = (req: Request, res: Response): void => {
    let userId = req.params.userId as string;
    const courseId = req.params.courseId as string;
    if (userId === "current") {
      const currentUser = req.session.currentUser;
      if (!currentUser) { res.sendStatus(401); return; }
      userId = currentUser._id;
    }
    res.json(dao.unEnrollUserFromCourse(userId, courseId));
  };

  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
  app.post("/api/users/:userId/courses/:courseId", enrollUserInCourse);
  app.delete("/api/users/:userId/courses/:courseId", unEnrollUserFromCourse);
}
