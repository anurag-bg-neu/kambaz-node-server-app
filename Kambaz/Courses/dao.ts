import { v4 as uuidv4 } from "uuid";
import type { Course, Database } from "../types.ts";

export default function CoursesDao(db: Database) {
  function findCoursesForEnrolledUser(userId: string): Course[] {
    const { courses, enrollments } = db;
    return courses.filter((course) =>
      enrollments.some((e) => e.user === userId && e.course === course._id)
    );
  }

  function findAllCourses(): Course[] {
    return db.courses;
  }

  function createCourse(course: Omit<Course, "_id">): Course {
    const newCourse: Course = { ...course, _id: uuidv4() };
    db.courses = [...db.courses, newCourse];
    return newCourse;
  }

  function updateCourse(courseId: string, courseUpdates: Partial<Course>): Course | undefined {
    const course = db.courses.find((c) => c._id === courseId);
    if (course) Object.assign(course, courseUpdates);
    return course;
  }

  function deleteCourse(courseId: string): void {
    db.courses = db.courses.filter((c) => c._id !== courseId);
    db.enrollments = db.enrollments.filter((e) => e.course !== courseId);
  }

  return { findAllCourses, findCoursesForEnrolledUser, createCourse, updateCourse, deleteCourse };
}
