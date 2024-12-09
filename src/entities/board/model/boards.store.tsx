import { create } from "zustand";
import { Board } from "./types";
import { boardsRepository } from "./boards.repository";
import { nanoid } from "nanoid";

type BoardsStore = {
  boards?: Board[];
  isLoading?: boolean;
  error?: string;
  loadBoards: () => Promise<void>;
  removerBoard: (boardId: string) => Promise<void>;
  createBoard: (board: {
    name: string;
    ownerId: string;
    editorsIds: string[];
  }) => Promise<void>;
};

export const createBoardsStore = (userId?: string) => {
  return create<BoardsStore>((set) => ({
    boards: [],
    error: undefined,
    isLoading: false,
    loadBoards: async () => {
      try {
        set({ isLoading: true });
        const boards = await boardsRepository.getBoards(userId);
        set({
          boards,
        });
      } finally {
        set({ isLoading: false });
      }
    },
    removerBoard: async (boardId) => {
      await boardsRepository.removerBoard(boardId);
      set({ boards: await boardsRepository.getBoards(userId) });
    },
    createBoard: async (data) => {
      const newboard = { id: nanoid(), ...data };

      await boardsRepository.addBoard(newboard as Board);
      set({ boards: await boardsRepository.getBoards(userId) });
    },
  }));
};
