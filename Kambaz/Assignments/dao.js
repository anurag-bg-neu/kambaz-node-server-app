import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao() {

  async function findAssignmentsForCourse(courseId) {
    return await model.find({course : courseId});
  }

  async function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    return await model.create(newAssignment);
  }

  async function updateAssignment(assignmentId, assignmentUpdates) {
    const assignment = await model.findById(assignmentId);
    Object.assign(assignment, assignmentUpdates);
    await assignment.save();
    return assignment;
  }

  async function deleteAssignment(assignmentId) {
    return await model.deleteOne({ _id: assignmentId });
  }

  return {
    findAssignmentsForCourse,
    createAssignment,
    updateAssignment,
    deleteAssignment,
   };
}
