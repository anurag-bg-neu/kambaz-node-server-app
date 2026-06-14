import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import type { User } from "./Kambaz/types.ts";
import Hello from "./Hello.ts";
import Lab5 from "./Lab5/index.ts";
import UserRoutes from "./Kambaz/Users/routes.ts";
import CourseRoutes from "./Kambaz/Courses/routes.ts";
import ModulesRoutes from "./Kambaz/Modules/routes.ts";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.ts";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.ts";

declare module "express-session" {
  interface SessionData {
    currentUser: User | null;
  }
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1/kambaz");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);

const sessionOptions: session.SessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};

if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}

app.use(session(sessionOptions));
app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
ModulesRoutes(app);
AssignmentsRoutes(app);
EnrollmentsRoutes(app);
Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000);
