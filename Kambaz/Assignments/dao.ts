import { v4 as uuidv4 } from "uuid";
import type { Assignment } from "../types.ts";
import AssignmentModel from "./model.ts";

export default function AssignmentsDao() {
  const findAssignmentsForCourse = (courseId: string): Promise<Assignment[]> =>
    AssignmentModel.find({ course: courseId }).lean() as unknown as Promise<Assignment[]>;

  const createAssignment = async (assignment: Omit<Assignment, "_id">): Promise<Assignment> => {
    const doc = new AssignmentModel({ ...assignment, _id: uuidv4() });
    return (await doc.save()).toObject() as unknown as Assignment;
  };

  const updateAssignment = (assignmentId: string, updates: Partial<Assignment>): Promise<Assignment | null> =>
    AssignmentModel.findByIdAndUpdate(assignmentId, { $set: updates }, { new: true }).lean() as Promise<Assignment | null>;

  const deleteAssignment = (assignmentId: string) => AssignmentModel.findByIdAndDelete(assignmentId);

  return { findAssignmentsForCourse, createAssignment, updateAssignment, deleteAssignment };
}
