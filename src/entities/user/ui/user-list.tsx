import { ReactNode } from "react";
import { User } from "../model/types";
import { getAvatarUrl } from "./get-avatar-url";
import { useUsers } from "../model/users.store";

export const UserList = ({
  userActions,
}: {
  userActions?: (user: User) => ReactNode;
}) => {
  const { users } = useUsers();

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <div>
            <img src={getAvatarUrl(user.avatarId)} />
          </div>
          <div>{user.name}</div>
          <div>{userActions?.(user)}</div>
        </div>
      ))}
    </div>
  );
};
