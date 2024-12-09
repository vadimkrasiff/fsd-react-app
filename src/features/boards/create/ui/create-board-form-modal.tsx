import classNames from "classnames";
import { Controller, useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { UserMultiSelect, UserSelectId } from "../../../../entities/user";
import { UIModal } from "../../../../shared/ui/layouts/ui-modal";
import { useState } from "react";

export type CreateBoardFormData = {
  name: string;
  ownerId: string;
  editorsIds: string[];
};

export const CreateBoardFormModal = ({
  createBoard,
  className,
  userId,
}: {
  createBoard: (board: {
    name: string;
    ownerId: string;
    editorsIds: string[];
  }) => Promise<void>;
  className?: string;
  userId?: string;
}) => {
  const [openForm, setOpenForm] = useState(false);

  const { control, reset, handleSubmit } = useForm<CreateBoardFormData>({
    defaultValues: {
      name: "",
      ownerId: userId,
      editorsIds: [],
    },
  });

  return (
    <>
      <div className="w-full flex gap-3 justify-end">
        <Button variant="contained" onClick={() => setOpenForm(true)}>
          Добавить
        </Button>
      </div>
      <UIModal
        title={"Создать доску"}
        onClose={() => setOpenForm(false)}
        open={openForm}
        style={{ maxWidth: 800 }}
      >
        <div className={classNames(className)}>
          <form
            className="w-full flex flex-col gap-3"
            onSubmit={handleSubmit((data) => {
              createBoard?.(data);
              setOpenForm(false);
              reset();
            })}
          >
            <Controller
              control={control}
              name="name"
              rules={{ required: "Обязательное поле" }}
              render={({ field: { value, onChange }, fieldState }) => (
                <TextField
                  label="Наименование"
                  value={value}
                  onChange={onChange}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="ownerId"
              rules={{ required: "Обязательное поле" }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <UserSelectId
                  label="Автор"
                  userId={value}
                  onChangeUser={onChange}
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="editorsIds"
              rules={{ required: "Обязательное поле" }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <UserMultiSelect
                  label="Администраторы"
                  usersIds={value}
                  onChangeUsers={onChange}
                  error={error?.message}
                />
              )}
            />
            <div className="w-full flex justify-end gap-3">
              <Button
                onClick={() => {
                  setOpenForm(false);
                  reset();
                }}
                variant="outlined"
              >
                Отмена
              </Button>
              <Button type="submit" variant="contained">
                Создать
              </Button>
            </div>
          </form>
        </div>
      </UIModal>
    </>
  );
};
