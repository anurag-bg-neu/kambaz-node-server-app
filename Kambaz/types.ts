export type UserRole = "FACULTY" | "STUDENT" | "TA" | "ADMIN";

export interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: UserRole;
  loginId: string;
  section: string;
  lastActivity: string;
  totalActivity: string;
}

export interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
  author?: string;
}

export interface Lesson {
  _id: string;
  name: string;
  description: string;
  module: string;
}

export interface Module {
  _id: string;
  name: string;
  description: string;
  course: string;
  editing: boolean;
  lessons?: Lesson[];
}

export interface Assignment {
  _id: string;
  title: string;
  course: string;
  description: string;
  points: number;
  dueDate: string;
  availableDate: string;
  untilDate: string;
}

export interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  description: string;
  editing?: boolean;
}

export interface Database {
  users: User[];
  courses: Course[];
  modules: Module[];
  assignments: Assignment[];
  enrollments: Enrollment[];
}
