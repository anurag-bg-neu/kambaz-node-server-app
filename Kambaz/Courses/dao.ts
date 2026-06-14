import { v4 as uuidv4 } from "uuid";
import type { Course } from "../types.ts";
import CourseModel from "./model.ts";
import EnrollmentModel from "../Enrollments/model.ts";

export default function CoursesDao() {
  const findAllCourses = (): Promise<Course[]> =>
    CourseModel.find().lean() as unknown as Promise<Course[]>;

  const findCoursesForEnrolledUser = async (userId: string): Promise<Course[]> => {
    const enrollments = await EnrollmentModel.find({ user: userId }).lean();
    const courseIds = enrollments.map((e) => e.course as string);
    return CourseModel.find({ _id: { $in: courseIds } }).lean() as unknown as Promise<Course[]>;
  };

  const createCourse = async (course: Omit<Course, "_id">): Promise<Course> => {
    const doc = new CourseModel({ ...course, _id: uuidv4() });
    return (await doc.save()).toObject() as unknown as Course;
  };

  const updateCourse = (courseId: string, updates: Partial<Course>): Promise<Course | null> =>
    CourseModel.findByIdAndUpdate(courseId, { $set: updates }, { new: true }).lean() as Promise<Course | null>;

  const deleteCourse = async (courseId: string): Promise<void> => {
    await CourseModel.findByIdAndDelete(courseId);
    await EnrollmentModel.deleteMany({ course: courseId });
  };

  return { findAllCourses, findCoursesForEnrolledUser, createCourse, updateCourse, deleteCourse };
}
