import { v4 as uuidv4 } from "uuid";
import type { Assignment, Database } from "../types.ts";

export default function AssignmentsDao(db: Database) {
  function findAssignmentsForCourse(courseId: string): Assignment[] {
    return db.assignments.filter((a) => a.course === courseId);
  }

  function createAssignment(assignment: Omit<Assignment, "_id">): Assignment {
    const newAssignment: Assignment = { ...assignment, _id: uuidv4() };
    db.assignments = [...db.assignments, newAssignment];
    return newAssignment;
  }

  function updateAssignment(assignmentId: string, assignmentUpdates: Partial<Assignment>): Assignment | undefined {
    const assignment = db.assignments.find((a) => a._id === assignmentId);
    if (assignment) Object.assign(assignment, assignmentUpdates);
    return assignment;
  }

  function deleteAssignment(assignmentId: string): void {
    db.assignments = db.assignments.filter((a) => a._id !== assignmentId);
  }

  return { findAssignmentsForCourse, createAssignment, updateAssignment, deleteAssignment };
}
