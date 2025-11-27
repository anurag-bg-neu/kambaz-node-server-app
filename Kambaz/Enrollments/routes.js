import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const findEnrollmentsForUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  const enrollUserInCourse = (req, res) => {
    let { userId } = req.params;
    const { courseId } = req.body;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const newEnrollment = dao.enrollUserInCourse(userId, courseId);
    res.send(newEnrollment);
  };

  const unEnrollUserFromCourse = (req, res) => {
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const updatedEnrollments = dao.unEnrollUserFromCourse(userId, courseId);
    res.json(updatedEnrollments);
  };

  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
  app.post("/api/users/:userId/enrollments", enrollUserInCourse);
  app.delete("/api/users/:userId/enrollments/:courseId", unEnrollUserFromCourse);
}
