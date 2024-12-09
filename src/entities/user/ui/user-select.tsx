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

export function UserSelect({
  className,
  label,
  onChangeUser,
  value,
  required,
  error,
}: {
  className?: string;
  label?: string;
  onChangeUser: (e: SelectChangeEvent<User>) => void;
  value?: User;
  required?: boolean;
  error?: string;
}) {
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
        value={value}
        renderValue={(user) => {
          return <UserPreview {...(user as User)} />;
        }}
      >
        {users.map((user) => (
          //@ts-expect-error - necessary to load object into value
          <MenuItem key={user.id} value={user}>
            <UserPreview {...user} />
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
}
