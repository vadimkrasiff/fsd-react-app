import { ReactNode, useEffect, useState } from "react";
import { useUsers } from "../entities/user";
import { useSession } from "../entities/session";

export function AppLoader({ children }: { children?: ReactNode }) {
  const loadUsers = useUsers((s) => s.loadUsers);
  const loadSession = useSession((s) => s.loadSession);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([loadSession(), loadUsers()]).finally(() => {
      setIsLoading(false);
    });
  }, [loadSession, loadUsers]);

  if (isLoading) {
    return <>Загрузка...</>;
  }

  return <>{children}</>;
}
