import { IconButton } from "@mui/material";
import { useSession } from "../../../entities/session";
import { useUsers } from "../../../entities/user";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

function useRemoveUser() {
  const { currenSession, removeSession } = useSession();
  const removeUser = useUsers((s) => s.removeUser);

  return async (userId: string) => {
    if (currenSession?.userId === userId) {
      await removeSession();
    }

    removeUser(userId);
  };
}

export function RemoveUserButton({ userId }: { userId: string }) {
  const removeUser = useRemoveUser();
  return (
    <IconButton onClick={() => removeUser(userId)}>
      <PersonRemoveIcon />
    </IconButton>
  );
}
