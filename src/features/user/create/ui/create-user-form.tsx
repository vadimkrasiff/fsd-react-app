import { Controller, useForm } from "react-hook-form";
import { getAvatarUrl, useUsers } from "../../../../entities/user";
import { Button, TextField } from "@mui/material";
import { UIImageSelect } from "../../../../shared/ui/layouts/ui-image-select";

export type CreateUserFormData = {
  name: string;
  avatarId: string;
};

export function CreateUSerForm({ className }: { className?: string }) {
  const { createUser } = useUsers();
  const { control, reset, handleSubmit } = useForm<CreateUserFormData>({
    defaultValues: { name: "", avatarId: "" },
  });

  return (
    <div className={className}>
      <h2>Добавить пользователя</h2>
      <form
        style={{ width: 300 }}
        className="flex flex-col gap-3"
        onSubmit={handleSubmit((data) => {
          createUser?.(data);
          reset();
        })}
      >
        <Controller
          control={control}
          name="name"
          rules={{ required: "Имя пользователя - обязательное поле" }}
          render={({ field, fieldState }) => (
            <TextField
              label="Имя нового пользователя"
              inputProps={{ ...field }}
              error={!!fieldState.error?.message}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="avatarId"
          rules={{ required: "Аватар - обязательное поле" }}
          render={({ field: { value, onChange }, fieldState }) => (
            <UIImageSelect
              images={Array.from({ length: 8 }, (_, i) => i + 1)}
              onChange={onChange}
              getSource={getAvatarUrl}
              label="Выберите аватар пользователя"
              value={value}
              error={!!fieldState.error?.message}
              helpertext={fieldState.error?.message}
            />
          )}
        />
        <Button type="submit" variant="contained">
          Добавить
        </Button>
      </form>
    </div>
  );
}