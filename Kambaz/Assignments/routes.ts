import type { Express, Request, Response } from "express";
import type { Database } from "../types.ts";
import AssignmentsDao from "./dao.ts";

export default function AssignmentRoutes(app: Express, db: Database): void {
  const dao = AssignmentsDao(db);

  const findAssignmentsForCourse = (req: Request, res: Response): void => {
    res.json(dao.findAssignmentsForCourse(req.params.courseId as string));
  };

  const createAssignmentForCourse = (req: Request, res: Response): void => {
    const assignment = { ...req.body, course: req.params.courseId as string };
    res.send(dao.createAssignment(assignment));
  };

  const updateAssignment = (req: Request, res: Response): void => {
    res.send(dao.updateAssignment(req.params.assignmentId as string, req.body));
  };

  const deleteAssignment = (req: Request, res: Response): void => {
    dao.deleteAssignment(req.params.assignmentId as string);
    res.sendStatus(200);
  };

  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}
