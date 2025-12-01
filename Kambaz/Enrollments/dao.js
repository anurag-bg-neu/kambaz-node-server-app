import model from "./model.js";

export default function EnrollmentsDao() {

  async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
  }

  async function findEnrollmentsForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("user");
    return enrollments;
  }

  async function enrollIntoCourse(userId, courseId) {
    return model.create({
     user: userId,
     course: courseId,
     _id: `${userId}-${courseId}`,
   });
  }

  async function unenrollFromCourse(user, course) {
    return model.deleteOne({ user, course });
  }

  async function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }

  return {
    findCoursesForUser,
    findEnrollmentsForUser,
    enrollIntoCourse,
    unenrollFromCourse,
    unenrollAllUsersFromCourse,
  };
}
