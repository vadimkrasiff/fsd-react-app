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

export function UserMultiSelect({
  className,
  label,
  onChangeUsers,
  usersIds,
  required,
  error,
}: {
  className?: string;
  label?: string;
  onChangeUsers: (e: SelectChangeEvent<string[]>) => void;
  usersIds?: string[];
  required?: boolean;
  error?: string;
}) {
  const users = useUsers((s) => s.users);

  const usersSelected: User[] = useMemo(
    () => users.filter((users) => usersIds?.includes(users.id)),
    [users, usersIds],
  );
  return (
    <FormControl error={!!error}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        onChange={onChangeUsers}
        required={required}
        className={classNames(className)}
        label={label}
        value={usersIds}
        multiple
        renderValue={() => {
          return (
            <div className="flex flex-wrap gap-2">
              {usersSelected?.map((user) => (
                <div
                  key={user.id}
                  style={{
                    border: "1px solid #e5e7eb",
                    padding: 5,
                    borderRadius: 4,
                    backgroundColor: "#1976d214",
                  }}
                >
                  <UserPreview {...user} />
                </div>
              ))}
            </div>
          );
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
