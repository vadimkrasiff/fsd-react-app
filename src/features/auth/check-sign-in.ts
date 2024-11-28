import { useSession } from "../../entities/session";
import { User } from "../../entities/user";

export function useCheckSignIn() {
  const session = useSession((s) => s.currenSession);

  return {
    isSignIn: () => !!session,
    isUserSignIn: (user: User) => user.id === session?.userId,
  };
}
