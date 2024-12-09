import { IconButton } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import { useSession } from "../../../entities/session";
import { Board } from "../../../entities/board/model/types";

export function RemoveBoardButton({
  board,
  removerBoard,
}: {
  board: Board;
  removerBoard?: (boardId: string) => Promise<void>;
}) {
  const { userId } = useSession((s) => s.currenSession) || {};

  if (userId !== board.ownerId) {
    return null;
  }
  return (
    <IconButton onClick={() => removerBoard?.(board.id)}>
      <DeleteOutlined />
    </IconButton>
  );
}
