import { ReactNode, useCallback, useEffect, useState } from "react";
import { Board } from "../../../entities/board/model/types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getAvatarUrl, useUsers } from "../../../entities/user";
import { NavLink } from "react-router-dom";

export function BoardsList({
  boardActions,
  boards,
  loadBoards,
}: {
  loadBoards: () => Promise<void>;
  boards?: Board[];
  boardActions: (board: Board) => ReactNode;
}) {
  const { getUserById, users } = useUsers();
  const [isLoading, setIsLoading] = useState(true);
  const getBoards = useCallback(async () => {
    try {
      setIsLoading(true);

      await loadBoards();
    } finally {
      setIsLoading(false);
    }
  }, [loadBoards]);

  useEffect(() => {
    getBoards();
  }, [getBoards]);

  const columns: GridColDef<Board>[] = [
    {
      field: "name",
      headerName: "Наименование",
      flex: 1,
      renderCell: (params) => {
        const { id, name } = params.row;

        return (
          <NavLink style={{ color: "#2563eb" }} to={`/board/${id}`}>
            {name}
          </NavLink>
        );
      },
    },
    {
      field: "editorsIds",
      headerName: "Администраторы",
      flex: 1,
      renderCell: (params) => {
        const { editorsIds } = params.row;

        const editors = users.filter((user) => editorsIds.includes(user.id));
        return (
          <div className="relative">
            {editors?.map((user, i) => {
              const left = i * 20;
              return (
                <div
                  key={user.id}
                  style={{ left }}
                  className={`absolute flex items-center gap-2`}
                >
                  <img
                    style={{ width: 50 }}
                    src={getAvatarUrl(user?.avatarId || "")}
                  />
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      field: "author",
      headerName: "Автор",
      flex: 1,
      renderCell: (params) => {
        const { ownerId } = params.row;

        const user = getUserById(ownerId);
        return (
          <div className="flex items-center gap-2">
            <img
              style={{ width: 50 }}
              src={getAvatarUrl(user?.avatarId || "")}
            />
            <div>{user?.name}</div>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Действия",
      renderCell: (params) => {
        return <>{boardActions?.(params.row)}</>;
      },
      flex: 1,
    },
  ];
  return (
    <div className="w-full flex flex-col items-center gap-5">
      <div className="flex justify-center items-center gap-8 w-full">
        <DataGrid
          loading={isLoading}
          className="w-full"
          rows={boards}
          columns={columns}
        />
      </div>
    </div>
  );
}
