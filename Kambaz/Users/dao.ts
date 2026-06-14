import { v4 as uuidv4 } from "uuid";
import type { User } from "../types.ts";
import UserModel from "./model.ts";

export default function UsersDao() {
  const findAllUsers = (): Promise<User[]> =>
    UserModel.find().lean() as unknown as Promise<User[]>;

  const findUserById = (userId: string): Promise<User | null> =>
    UserModel.findById(userId).lean() as Promise<User | null>;

  const findUsersByRole = (role: string): Promise<User[]> =>
    UserModel.find({ role }).lean() as unknown as Promise<User[]>;

  const findUsersByPartialName = (partialName: string): Promise<User[]> => {
    const regex = new RegExp(partialName, "i");
    return UserModel.find({
      $or: [{ firstName: regex }, { lastName: regex }],
    }).lean() as unknown as Promise<User[]>;
  };

  const findUserByUsername = (username: string): Promise<User | null> =>
    UserModel.findOne({ username }).lean() as Promise<User | null>;

  const findUserByCredentials = (username: string, password: string): Promise<User | null> =>
    UserModel.findOne({ username, password }).lean() as Promise<User | null>;

  const createUser = async (user: Omit<User, "_id">): Promise<User> => {
    const doc = new UserModel({ ...user, _id: uuidv4() });
    return (await doc.save()).toObject() as unknown as User;
  };

  const updateUser = (userId: string, updates: Partial<User>): Promise<User | null> =>
    UserModel.findByIdAndUpdate(userId, { $set: updates }, { new: true }).lean() as Promise<User | null>;

  const deleteUser = (userId: string) => UserModel.findByIdAndDelete(userId);

  return {
    findAllUsers, findUserById, findUsersByRole, findUsersByPartialName,
    findUserByUsername, findUserByCredentials, createUser, updateUser, deleteUser,
  };
}
