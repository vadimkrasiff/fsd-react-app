import { Button } from "@mui/material";
import { useSession } from "../../entities/session";
import { User, UserSelect } from "../../entities/user";
import { Controller, useForm } from "react-hook-form";
import { redirect } from "react-router-dom";
import { ROUTE_PATH } from "../../shared/constants/routes";
import { useNotifications } from "@toolpad/core/useNotifications";
import classNames from "classnames";

function useSignInUser() {
  const createSession = useSession((s) => s.createSession);

  return (user: User) => {
    createSession({
      userId: user.id,
      ...user,
    });
  };
}
export type SignInFormData = {
  user?: User;
};

export const SignInForm = ({
  className,
  style = {},
}: {
  className?: string;
  style?: React.CSSProperties;
}) => {
  const signInUser = useSignInUser();
  const notification = useNotifications();
  const { control, reset, handleSubmit } = useForm<SignInFormData>({
    defaultValues: {
      user: undefined,
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      signInUser(data.user as User);
      reset();
      redirect("/" + ROUTE_PATH.USERS);
    } catch (e) {
      notification.show(`Ошибка в авторизации\n${e as string}`, {
        autoHideDuration: 3000,
        severity: "error",
      });
    }
  };

  return (
    <div style={{ ...style }} className={classNames(className, "w-full")}>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h4 className="flex w-full justify-center text-lg">Авторизация</h4>
        <Controller
          control={control}
          name="user"
          rules={{ required: "Обязательное поле" }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <UserSelect
              error={error?.message}
              label="Автор"
              value={value}
              onChangeUser={onChange}
            />
          )}
        />
        <Button type="submit" variant="contained">
          Войти
        </Button>
      </form>
    </div>
  );
};
