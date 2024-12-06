import { ReactNode } from "react";
import { User } from "../../../entities/user/model/types";
import { getAvatarUrl } from "../../../entities/user/ui/get-avatar-url";
import { useUsers } from "../../../entities/user/model/users.store";

export const UserList = ({
  userActions,
}: {
  userActions?: (user: User) => ReactNode;
}) => {
  const { users } = useUsers();

  return (
    <div className="flex flex-col items-center gap-5 pt-3">
      <h1 className="text-xl">Все пользователи</h1>
      <div className="flex justify-center items-center gap-8 pt-3">
        {users.map((user) => (
          <div
            style={{
              borderRadius: 4,
              border: "1px solid rgba(0, 0, 0, 0.23)",
            }}
            className="flex flex-col justify-center items-center gap-2 p-3"
            key={user.id}
          >
            <img style={{ width: 100 }} src={getAvatarUrl(user.avatarId)} />
            <div>{user.name}</div>
            <div>{userActions?.(user)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
