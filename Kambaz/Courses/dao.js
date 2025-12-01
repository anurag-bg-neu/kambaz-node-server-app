import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function CoursesDao() {

  async function findAllCourses() {
    return await model.find({}, { name: 1, description: 1 });
  }

  async function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    return await model.create(newCourse);
  }

  async function updateCourse(courseId, courseUpdates) {
    return await model.updateOne({ _id: courseId }, { $set: courseUpdates });
  }

  async function deleteCourse(courseId) {
    return await model.deleteOne({ _id: courseId });
  }

  return {
    findAllCourses,
    createCourse,
    updateCourse,
    deleteCourse,
   };
}
