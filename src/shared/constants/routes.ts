export const ROUTE_PATH = {
  HOME: "/",
  BOARD: "/board/:boardId",
  BOARDS: "/board",
  USERS: "/user",
  AUTH: "/auth",
} as const;

export const ROUTE_NAME: Record<string, string> = {
  [""]: "Главная",
  ["board"]: "Доски",
  ["user"]: "Пользователи",
  ["auth"]: "Авторизация",
} as const;
