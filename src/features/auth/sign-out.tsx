import { Button } from "@mui/material";
import { useSession } from "../../entities/session";

function useSignOut() {
  return useSession((s) => s.removeSession);
}

export const SignOutButton = ({ className }: { className?: string }) => {
  const signOut = useSignOut();

  return (
    <Button className={className} variant="contained" onClick={() => signOut()}>
      Выйти
    </Button>
  );
};
