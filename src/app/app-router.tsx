import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { ROUTE_PATH } from "../shared/constants/routes";
import { RootLayout } from "../widgets/root-layout";
import { UsersPage } from "../pages/users";
import { BoardPage } from "../pages/board";
import { BoardsPage } from "../pages/boards";

const router = createBrowserRouter([
  {
    path: ROUTE_PATH.HOME,
    element: <RootLayout />,
    children: [
      { path: "", loader: () => redirect(ROUTE_PATH.USERS) },
      { path: ROUTE_PATH.USERS, element: <UsersPage /> },
      { path: ROUTE_PATH.BOARD, element: <BoardPage /> },
      { path: ROUTE_PATH.BOARDS, element: <BoardsPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
