import type { Express, Request, Response } from "express";
import CoursesDao from "./dao.ts";
import EnrollmentsDao from "../Enrollments/dao.ts";

export default function CourseRoutes(app: Express): void {
  const dao = CoursesDao();
  const enrollmentsDao = EnrollmentsDao();

  const findAllCourses = async (_req: Request, res: Response): Promise<void> => {
    res.json(await dao.findAllCourses());
  };

  const findCoursesForEnrolledUser = async (req: Request, res: Response): Promise<void> => {
    let userId = req.params.userId as string;
    if (userId === "current") {
      const currentUser = req.session.currentUser;
      if (!currentUser) { res.sendStatus(401); return; }
      userId = currentUser._id;
    }
    res.json(await dao.findCoursesForEnrolledUser(userId));
  };

  const createCourse = async (req: Request, res: Response): Promise<void> => {
    const currentUser = req.session.currentUser;
    if (!currentUser) { res.sendStatus(401); return; }
    const newCourse = await dao.createCourse(req.body);
    await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  const updateCourse = async (req: Request, res: Response): Promise<void> => {
    const courseId = req.params.courseId as string;
    res.json(await dao.updateCourse(courseId, req.body));
  };

  const deleteCourse = async (req: Request, res: Response): Promise<void> => {
    await dao.deleteCourse(req.params.courseId as string);
    res.sendStatus(200);
  };

  const findUsersForCourse = async (req: Request, res: Response): Promise<void> => {
    res.json(await enrollmentsDao.findUsersForCourse(req.params.courseId as string));
  };

  app.get("/api/courses", findAllCourses);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/current/courses", createCourse);
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.get("/api/courses/:courseId/users", findUsersForCourse);
}
