import type { Express, Request, Response } from "express";
import AssignmentsDao from "./dao.ts";

export default function AssignmentRoutes(app: Express): void {
  const dao = AssignmentsDao();

  const findAssignmentsForCourse = async (req: Request, res: Response): Promise<void> => {
    res.json(await dao.findAssignmentsForCourse(req.params.courseId as string));
  };

  const createAssignmentForCourse = async (req: Request, res: Response): Promise<void> => {
    const assignment = { ...req.body, course: req.params.courseId as string };
    res.json(await dao.createAssignment(assignment));
  };

  const updateAssignment = async (req: Request, res: Response): Promise<void> => {
    res.json(await dao.updateAssignment(req.params.assignmentId as string, req.body));
  };

  const deleteAssignment = async (req: Request, res: Response): Promise<void> => {
    await dao.deleteAssignment(req.params.assignmentId as string);
    res.sendStatus(200);
  };

  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}
