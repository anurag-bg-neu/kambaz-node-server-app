import type { Express, Request, Response } from "express";
import type { Todo } from "../Kambaz/types.ts";

let todos: Todo[] = [
  { id: 1, title: "Task 1", completed: false, description: "Task-1 description", editing: false },
  { id: 2, title: "Task 2", completed: true,  description: "Task-2 description", editing: false },
  { id: 3, title: "Task 3", completed: false, description: "Task-3 description", editing: false },
  { id: 4, title: "Task 4", completed: true,  description: "Task-4 description", editing: false },
];

const todos1: Todo[] = [{ id: 555, title: "", completed: false, description: "" }];

export default function WorkingWithArrays(app: Express): void {
  app.get("/lab5/todos", (req: Request, res: Response): void => {
    const { completed } = req.query;
    if (completed !== undefined) {
      res.json(todos.filter((t) => t.completed === (completed === "true")));
      return;
    }
    res.json(todos);
  });

  app.get("/lab5/todos1", (req: Request, res: Response): void => {
    const { completed } = req.query;
    if (completed !== undefined) {
      res.json(todos1.filter((t) => t.completed === (completed === "true")));
      return;
    }
    res.json(todos1);
  });

  app.get("/lab5/todos/create", (_req: Request, res: Response): void => {
    const thisId = new Date().getTime();
    const newTodo: Todo = { id: thisId, title: "New Task", completed: false, description: `New Description for ${thisId}` };
    todos.push(newTodo);
    res.json(todos);
  });

  app.post("/lab5/todos", (req: Request, res: Response): void => {
    const newTodo: Todo = { ...req.body, id: new Date().getTime() };
    todos.push(newTodo);
    res.json(newTodo);
  });

  app.get("/lab5/todos/:id", (req: Request, res: Response): void => {
    const id = req.params.id as string;
    res.json(todos.find((t) => t.id === parseInt(id)));
  });

  app.get("/lab5/todos/:id/delete", (req: Request, res: Response): void => {
    const id = req.params.id as string;
    const idx = todos.findIndex((t) => t.id === parseInt(id));
    if (idx === -1) { res.status(404).json({ message: `Unable to delete Todo with ID ${id}` }); return; }
    todos.splice(idx, 1);
    res.json(todos);
  });

  app.delete("/lab5/todos/:id", (req: Request, res: Response): void => {
    const id = req.params.id as string;
    const idx = todos.findIndex((t) => t.id === parseInt(id));
    if (idx === -1) { res.status(404).json({ message: `Unable to delete Todo with ID ${id}` }); return; }
    todos.splice(idx, 1);
    res.sendStatus(200);
  });

  app.get("/lab5/todos/:id/title/:title", (req: Request, res: Response): void => {
    const { id, title } = req.params as Record<string, string>;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) todo.title = title;
    res.json(todos);
  });

  app.get("/lab5/todos/:id/completed/:completed", (req: Request, res: Response): void => {
    const { id, completed } = req.params as Record<string, string>;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) todo.completed = completed === "true";
    res.json(todos);
  });

  app.get("/lab5/todos/:id/description/:description", (req: Request, res: Response): void => {
    const { id, description } = req.params as Record<string, string>;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) todo.description = description;
    res.json(todos);
  });

  app.put("/lab5/todos/:id", (req: Request, res: Response): void => {
    const id = req.params.id as string;
    const idx = todos.findIndex((t) => t.id === parseInt(id));
    if (idx === -1) { res.status(404).json({ message: `Unable to update Todo with ID ${id}` }); return; }
    todos = todos.map((t) => (t.id === parseInt(id) ? { ...t, ...req.body } : t));
    res.sendStatus(200);
  });
}
