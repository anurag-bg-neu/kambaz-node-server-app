import { v4 as uuidv4 } from "uuid";
import type { Database, Enrollment } from "../types.ts";

export default function EnrollmentsDao(db: Database) {
  function findEnrollmentsForUser(userId: string): Enrollment[] {
    return db.enrollments.filter((e) => e.user === userId);
  }

  function enrollUserInCourse(userId: string, courseId: string): Enrollment {
    const newEnrollment: Enrollment = { _id: uuidv4(), user: userId, course: courseId };
    db.enrollments.push(newEnrollment);
    return newEnrollment;
  }

  function unEnrollUserFromCourse(userId: string, courseId: string): Enrollment[] {
    db.enrollments = db.enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    );
    return db.enrollments;
  }

  return { findEnrollmentsForUser, enrollUserInCourse, unEnrollUserFromCourse };
}
