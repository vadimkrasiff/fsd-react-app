import { Alert } from "@mui/material";
import { Board } from "../entities/board/model/types";
import { useSession } from "../entities/session";
import { CreateBoardFormModal } from "../features/boards/create";
import { BoardsList } from "../features/boards/list";
import { RemoveBoardButton } from "../features/boards/remove";
import { createBoardsStore } from "../entities/board/model/boards.store";
import { useMemo } from "react";

export function BoardsPage() {
  const session = useSession((s) => s.currenSession);

  const useBoards = useMemo(
    () => createBoardsStore(session?.userId),
    [session?.userId],
  );

  const { createBoard, boards, loadBoards, removerBoard } = useBoards();

  if (!session?.userId) {
    return <Alert content="Данный функционал не доступен" />;
  }

  const getBoardActions = (board: Board) => {
    return (
      <div className="h-full flex items-center gap-2">
        <RemoveBoardButton removerBoard={removerBoard} board={board} />
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <CreateBoardFormModal
        createBoard={createBoard}
        userId={session?.userId}
        className="w-full flex flex-col items-center gap-3"
      />
      <BoardsList
        boards={boards}
        loadBoards={loadBoards}
        boardActions={getBoardActions}
      />
    </div>
  );
}
