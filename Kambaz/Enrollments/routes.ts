import type { Express, Request, Response } from "express";
import EnrollmentsDao from "./dao.ts";

export default function EnrollmentsRoutes(app: Express): void {
  const dao = EnrollmentsDao();

  const findEnrollmentsForUser = async (req: Request, res: Response): Promise<void> => {
    let userId = req.params.userId as string;
    if (userId === "current") {
      const currentUser = req.session.currentUser;
      if (!currentUser) { res.sendStatus(401); return; }
      userId = currentUser._id;
    }
    res.json(await dao.findEnrollmentsForUser(userId));
  };

  const enrollUserInCourse = async (req: Request, res: Response): Promise<void> => {
    let userId = req.params.userId as string;
    const courseId = req.params.courseId as string;
    if (userId === "current") {
      const currentUser = req.session.currentUser;
      if (!currentUser) { res.sendStatus(401); return; }
      userId = currentUser._id;
    }
    res.json(await dao.enrollUserInCourse(userId, courseId));
  };

  const unEnrollUserFromCourse = async (req: Request, res: Response): Promise<void> => {
    let userId = req.params.userId as string;
    const courseId = req.params.courseId as string;
    if (userId === "current") {
      const currentUser = req.session.currentUser;
      if (!currentUser) { res.sendStatus(401); return; }
      userId = currentUser._id;
    }
    await dao.unEnrollUserFromCourse(userId, courseId);
    res.sendStatus(200);
  };

  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
  app.post("/api/users/:userId/courses/:courseId", enrollUserInCourse);
  app.delete("/api/users/:userId/courses/:courseId", unEnrollUserFromCourse);
}
