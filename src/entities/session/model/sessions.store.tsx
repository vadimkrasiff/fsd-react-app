import { create } from "zustand";
import { Session } from "./types";
import { sessionRepository } from "./sessions.repository";
import { nanoid } from "nanoid";

type CreateSessionData = {
  name: string;
  avatarId: string;
  userId: string;
};

type SessionStore = {
  currenSession?: Session;
  loadSession: () => Promise<void>;
  removeSession: () => Promise<void>;
  createSession: (data: CreateSessionData) => Promise<void>;
};

export const useSession = create<SessionStore>((set) => ({
  currenSession: undefined,
  loadSession: async () => {
    const session = await sessionRepository.getSessions();
    set({ currenSession: session });
  },
  removeSession: async () => {
    await sessionRepository.clearSession();
    set({ currenSession: undefined });
  },
  createSession: async (data) => {
    const newSession = { ...data, id: nanoid() };
    await sessionRepository.saveSession(newSession);
    set({ currenSession: newSession });
  },
}));
