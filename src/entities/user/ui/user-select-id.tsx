import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useUsers } from "../model/users.store";
import classNames from "classnames";
import { UserPreview } from "./user-preview";
import { User } from "../model/types";
import { useMemo } from "react";

export function UserSelectId({
  className,
  label,
  onChangeUser,
  userId,
  required,
  error,
}: {
  className?: string;
  label?: string;
  onChangeUser: (e: SelectChangeEvent<string>) => void;
  userId?: string;
  required?: boolean;
  error?: string;
}) {
  const { getUserById } = useUsers();

  const user = useMemo(
    () => (userId && getUserById(userId)) || {},
    [userId, getUserById],
  );
  const users = useUsers((s) => s.users);

  return (
    <FormControl error={!!error}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        style={{ height: 56 }}
        onChange={onChangeUser}
        required={required}
        className={classNames(className)}
        label={label}
        value={userId}
        renderValue={() => {
          return <UserPreview {...(user as User)} />;
        }}
      >
        {users.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            <UserPreview {...user} />
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
}
