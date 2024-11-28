import { Button } from "@mui/material";
import { useSession } from "../../entities/session";
import { User } from "../../entities/user";

function useSignInUser() {
  const createSession = useSession((s) => s.createSession);

  return (user: User) => {
    createSession({
      userId: user.id,
      ...user,
    });
  };
}

export const SignInButton = ({
  className,
  user,
}: {
  className?: string;
  user: User;
}) => {
  const signInUser = useSignInUser();

  return (
    <Button
      className={className}
      variant="contained"
      onClick={() => signInUser(user)}
    >
      Войти
    </Button>
  );
};
