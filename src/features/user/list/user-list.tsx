import { ReactNode } from "react";
import { User } from "../../../entities/user/model/types";
import { getAvatarUrl } from "../../../entities/user/ui/get-avatar-url";
import { useUsers } from "../../../entities/user/model/users.store";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const UserList = ({
  userActions,
}: {
  userActions?: (user: User) => ReactNode;
}) => {
  const { users } = useUsers();

  const columns: GridColDef<User>[] = [
    {
      field: "name",
      headerName: "Пользователь",
      renderCell: (params) => {
        const { avatarId, name } = params.row;
        return (
          <div className="flex items-center gap-2">
            <img style={{ width: 50 }} src={getAvatarUrl(avatarId)} />
            <div>{name}</div>
          </div>
        );
      },
      flex: 2,
    },
    {
      field: "action",
      headerName: "Действия",
      renderCell: (params) => {
        return <>{userActions?.(params.row)}</>;
      },
      flex: 1,
    },
  ];
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex justify-center items-center gap-8 w-full">
        <DataGrid className="w-full" rows={users} columns={columns} />
      </div>
    </div>
  );
};
