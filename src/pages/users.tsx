import { User, UserList } from "../entities/user";
import { useCheckSignIn } from "../features/auth/check-sign-in";
import { SignInButton } from "../features/auth/sign-in-user";
import { SignOutButton } from "../features/auth/sign-out";
import { CreateUSerForm } from "../features/user/create/ui/create-user-form";
import { RemoveUserButton } from "../features/user/remove";

export function UsersPage() {
  const { isUserSignIn } = useCheckSignIn();

  const getUserActions = (user: User) => {
    return (
      <div className="h-full flex items-center gap-2">
        {isUserSignIn(user) ? <SignOutButton /> : <SignInButton user={user} />}
        <RemoveUserButton userId={user.id} />
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl">Пользователи</h1>
      <CreateUSerForm className="mt-10 flex flex-col items-center gap-3" />
      <UserList userActions={getUserActions} />
    </div>
  );
}
