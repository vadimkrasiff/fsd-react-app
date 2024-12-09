import { persistStorage } from "../../../shared/lib/persist-storage";
import { Board } from "./types";

const BOARDS_STORAGE_KEY = "boards_storage";
export const boardsRepository = {
  getBoards: async (userId?: string) => {
    const boards = await persistStorage.getItemSafe<Board[]>(
      BOARDS_STORAGE_KEY,
      [],
    );
    return boards.filter((board) =>
      userId
        ? board.ownerId === userId || board.editorsIds.includes(userId)
        : board,
    );
  },
  getBoard: async (boardId?: string) => {
    const boards = await boardsRepository.getBoards();
    const board = boards.find((board) => board.id === boardId);

    return board;
  },
  saveBoard: async (value: Board) => {
    const boards = await boardsRepository.getBoards();

    return persistStorage.setItemSafe<Board[]>(
      BOARDS_STORAGE_KEY,
      boards.map((board) => (value.id === board.id ? value : board)),
    );
  },
  removerBoard: async (boardId: string) => {
    const boards = await boardsRepository.getBoards();
    return persistStorage.setItemSafe<Board[]>(
      BOARDS_STORAGE_KEY,
      boards.filter((board) => board.id !== boardId),
    );
  },
  addBoard: async (value: Board) => {
    const boards = await boardsRepository.getBoards();
    await persistStorage.setItemSafe<Board[]>(
      BOARDS_STORAGE_KEY,
      boards.concat(value),
    );
  },
};
