import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {

  function findEnrollmentsForUser(userId) {
    const { enrollments } = db;
    return enrollments.filter(enrollment => enrollment.user === userId);
  }

  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    const newEnrollment = { _id: uuidv4(), user: userId, course: courseId }
    enrollments.push(newEnrollment);
    return newEnrollment;
  }

  function unEnrollUserFromCourse(courseId) {
    const { enrollments } = db;
    db.enrollments = enrollments.filter((enrollment) => enrollment.course !== courseId);
  }

  return {
    findEnrollmentsForUser,
    enrollUserInCourse,
    unEnrollUserFromCourse,
  };
}
