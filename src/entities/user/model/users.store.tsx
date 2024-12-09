import { create } from "zustand";
import { User } from "./types";
import { usersRepository } from "./users.repository";
import { nanoid } from "nanoid";

type UserStore = {
  users: User[];
  loadUsers: () => Promise<void>;
  createUser: (data: { name: string; avatarId: string }) => Promise<void>;
  removeUser: (userId: string) => Promise<void>;
  getUserById: (id: string) => User | undefined;
};

export const useUsers = create<UserStore>((set, get) => ({
  users: [],
  loadUsers: async () => {
    set({ users: await usersRepository.getUsers() });
  },
  getUserById: (id: string) => {
    return get().users.find((user) => user.id === id);
  },
  createUser: async (data) => {
    const newUser = { id: nanoid(), ...data };
    await usersRepository.addUsers(newUser);
    set({ users: await usersRepository.getUsers() });
  },
  removeUser: async (userId) => {
    await usersRepository.removerUser(userId);
    set({ users: await usersRepository.getUsers() });
  },
}));
