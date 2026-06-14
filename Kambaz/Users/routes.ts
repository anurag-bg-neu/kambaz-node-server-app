import type { Express, Request, Response } from "express";
import type { Database } from "../types.ts";
import UsersDao from "./dao.ts";

export default function UserRoutes(app: Express, db: Database): void {
  const dao = UsersDao(db);

  const createUser = (_req: Request, _res: Response): void => {};
  const deleteUser = (_req: Request, _res: Response): void => {};
  const findAllUsers = (_req: Request, _res: Response): void => {};
  const findUserById = (_req: Request, _res: Response): void => {};

  const updateUser = (req: Request, res: Response): void => {
    const userId = req.params.userId as string;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    const currentUser = dao.findUserById(userId);
    req.session.currentUser = currentUser ?? null;
    res.json(currentUser);
  };

  const signup = (req: Request, res: Response): void => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session.currentUser = currentUser;
    res.json(currentUser);
  };

  const signin = (req: Request, res: Response): void => {
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session.currentUser = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };

  const signout = (req: Request, res: Response): void => {
    req.session.destroy(() => {});
    res.sendStatus(200);
  };

  const profile = (req: Request, res: Response): void => {
    const currentUser = req.session.currentUser;
    res.json(currentUser);
  };

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}
