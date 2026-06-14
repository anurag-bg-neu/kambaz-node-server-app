import { v4 as uuidv4 } from "uuid";
import type { Enrollment, User } from "../types.ts";
import EnrollmentModel from "./model.ts";
import UserModel from "../Users/model.ts";

export default function EnrollmentsDao() {
  const findEnrollmentsForUser = (userId: string): Promise<Enrollment[]> =>
    EnrollmentModel.find({ user: userId }).lean() as unknown as Promise<Enrollment[]>;

  const enrollUserInCourse = async (userId: string, courseId: string): Promise<Enrollment> => {
    const doc = new EnrollmentModel({ _id: uuidv4(), user: userId, course: courseId });
    return (await doc.save()).toObject() as unknown as Enrollment;
  };

  const unEnrollUserFromCourse = (userId: string, courseId: string) =>
    EnrollmentModel.deleteMany({ user: userId, course: courseId });

  const findUsersForCourse = async (courseId: string): Promise<User[]> => {
    const enrollments = await EnrollmentModel.find({ course: courseId }).lean();
    const userIds = enrollments.map((e) => e.user as string);
    return UserModel.find({ _id: { $in: userIds } }).lean() as unknown as User[];
  };

  return { findEnrollmentsForUser, enrollUserInCourse, unEnrollUserFromCourse, findUsersForCourse };
}
