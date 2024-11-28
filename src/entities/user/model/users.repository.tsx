import { persistStorage } from "../../../shared/lib/persist-storage";
import { User } from "./types";

const USERS_STORAGE_KEY = "user_storage";
export const usersRepository = {
  getUsers: () => {
    return persistStorage.getItemSafe<User[]>(USERS_STORAGE_KEY, []);
  },
  addUsers: async (value: User) => {
    const users = await usersRepository.getUsers();
    await persistStorage.setItemSafe<User[]>(
      USERS_STORAGE_KEY,
      users.concat(value),
    );
  },
  removerUser: async (userId: string) => {
    const users = await usersRepository.getUsers();
    await persistStorage.setItemSafe<User[]>(
      USERS_STORAGE_KEY,
      users.filter((user) => user.id !== userId),
    );
  },
};
