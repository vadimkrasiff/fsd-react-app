import { useParams } from "react-router-dom";
import { useBreadcrumbs } from "../entities/breadcrumbs/model/breadcrumbs.store";
import { createBoardStore } from "../entities/board/model/board.store";
import { useEffect, useMemo } from "react";

export function BoardPage() {
  const { boardId } = useParams();
  const useBoard = useMemo(() => createBoardStore({ boardId }), [boardId]);
  const { board, loadBoard } = useBoard();
  const { setCurrentPath, removeCurrentPath } = useBreadcrumbs();

  useEffect(() => {
    loadBoard();
  }, [loadBoard]);

  useEffect(() => {
    setCurrentPath(board?.name);

    return () => {
      removeCurrentPath();
    };
  }, [board?.name, removeCurrentPath, setCurrentPath]);

  return <div>Board Page</div>;
}
