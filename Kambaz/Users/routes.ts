import type { Express, Request, Response } from "express";
import UsersDao from "./dao.ts";

export default function UserRoutes(app: Express): void {
  const dao = UsersDao();

  const findAllUsers = async (req: Request, res: Response): Promise<void> => {
    const role = req.query.role as string | undefined;
    const name = req.query.name as string | undefined;
    if (role) { res.json(await dao.findUsersByRole(role)); return; }
    if (name) { res.json(await dao.findUsersByPartialName(name)); return; }
    res.json(await dao.findAllUsers());
  };

  const findUserById = async (req: Request, res: Response): Promise<void> => {
    const user = await dao.findUserById(req.params.userId as string);
    if (!user) { res.sendStatus(404); return; }
    res.json(user);
  };

  const createUser = async (req: Request, res: Response): Promise<void> => {
    const existing = await dao.findUserByUsername(req.body.username);
    if (existing) { res.status(400).json({ message: "Username already in use" }); return; }
    res.json(await dao.createUser(req.body));
  };

  const deleteUser = async (req: Request, res: Response): Promise<void> => {
    await dao.deleteUser(req.params.userId as string);
    res.sendStatus(200);
  };

  const updateUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.userId as string;
    await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    req.session.currentUser = currentUser ?? null;
    res.json(currentUser);
  };

  const signup = async (req: Request, res: Response): Promise<void> => {
    const existing = await dao.findUserByUsername(req.body.username);
    if (existing) { res.status(400).json({ message: "Username already in use" }); return; }
    const currentUser = await dao.createUser(req.body);
    req.session.currentUser = currentUser;
    res.json(currentUser);
  };

  const signin = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
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
    res.json(req.session.currentUser);
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
