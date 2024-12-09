import { create } from "zustand";
import { Board } from "./types";
import { boardsRepository } from "./boards.repository";

type BoardStore = {
  board: Board | undefined;
  isLoading?: boolean;
  error?: string;
  loadBoard: () => Promise<void>;
  saveBoard: (value: Board) => Promise<void>;
};

export const createBoardStore = ({ boardId }: { boardId?: string }) => {
  return create<BoardStore>((set) => ({
    board: undefined,
    error: undefined,
    isLoading: false,
    loadBoard: async () => {
      try {
        set({ isLoading: true });
        const board = await boardsRepository.getBoard(boardId);
        set({ board });
      } finally {
        set({ isLoading: false });
      }
    },
    saveBoard: async (value) => {
      try {
        set({ isLoading: true });
        await boardsRepository.saveBoard(value);
        set({ board: value });
      } finally {
        set({ isLoading: false });
      }
    },
  }));
};
