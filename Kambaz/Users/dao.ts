import { v4 as uuidv4 } from "uuid";
import type { Database, User } from "../types.ts";

export default function UsersDao(db: Database) {
  let { users } = db;

  const createUser = (user: Omit<User, "_id">): User => {
    const newUser: User = { ...user, _id: uuidv4() } as User;
    users = [...users, newUser];
    db.users = users;
    return newUser;
  };

  const findAllUsers = (): User[] => users;

  const findUserById = (userId: string): User | undefined =>
    users.find((user) => user._id === userId);

  const findUserByUsername = (username: string): User | undefined =>
    users.find((user) => user.username === username);

  const findUserByCredentials = (username: string, password: string): User | undefined =>
    users.find((user) => user.username === username && user.password === password);

  const findUsersByRole = (role: string): User[] =>
    users.filter((u) => u.role === role);

  const findUsersByPartialName = (partialName: string): User[] => {
    const q = partialName.toLowerCase();
    return users.filter(
      (u) =>
        u.firstName.toLowerCase().includes(q) ||
        u.lastName.toLowerCase().includes(q)
    );
  };

  const updateUser = (userId: string, user: User): void => {
    users = users.map((u) => (u._id === userId ? user : u));
    db.users = users;
  };

  const deleteUser = (userId: string): void => {
    users = users.filter((u) => u._id !== userId);
    db.users = users;
  };

  return {
    createUser, findAllUsers, findUserById, findUsersByRole, findUsersByPartialName,
    findUserByUsername, findUserByCredentials, updateUser, deleteUser,
  };
}
