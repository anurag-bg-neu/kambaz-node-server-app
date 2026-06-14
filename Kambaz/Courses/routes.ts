import type { Express, Request, Response } from "express";
import type { Database } from "../types.ts";
import CoursesDao from "./dao.ts";
import EnrollmentsDao from "../Enrollments/dao.ts";

export default function CourseRoutes(app: Express, db: Database): void {
  const dao = CoursesDao(db);
  const enrollmentsDao = EnrollmentsDao(db);

  const findAllCourses = (_req: Request, res: Response): void => {
    res.send(dao.findAllCourses());
  };

  const findCoursesForEnrolledUser = (req: Request, res: Response): void => {
    let userId = req.params.userId as string;
    if (userId === "current") {
      const currentUser = req.session.currentUser;
      if (!currentUser) { res.sendStatus(401); return; }
      userId = currentUser._id;
    }
    res.json(dao.findCoursesForEnrolledUser(userId));
  };

  const createCourse = (req: Request, res: Response): void => {
    const currentUser = req.session.currentUser;
    if (!currentUser) { res.sendStatus(401); return; }
    const newCourse = dao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  const updateCourse = (req: Request, res: Response): void => {
    const courseId = req.params.courseId as string;
    res.send(dao.updateCourse(courseId, req.body));
  };

  const deleteCourse = (req: Request, res: Response): void => {
    const courseId = req.params.courseId as string;
    dao.deleteCourse(courseId);
    res.sendStatus(200);
  };

  const findUsersForCourse = (req: Request, res: Response): void => {
    res.json(enrollmentsDao.findUsersForCourse(req.params.courseId as string));
  };

  app.get("/api/courses", findAllCourses);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/current/courses", createCourse);
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.get("/api/courses/:courseId/users", findUsersForCourse);
}
