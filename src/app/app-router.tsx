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
import { NotFoundPage } from "../pages/not-found-page";
import { useCheckSignIn } from "../features/auth/check-sign-in";
import { AuthPage } from "../pages/auth";

const router = (isSignIn: () => boolean) =>
  createBrowserRouter([
    {
      path: ROUTE_PATH.HOME,
      element: <RootLayout />,
      loader: ({ request }) => {
        const url = new URL(request.url);

        if (url.pathname === ROUTE_PATH.AUTH) {
          return null;
        }

        if (!isSignIn()) {
          return redirect(ROUTE_PATH.AUTH);
        }
        return null;
      },
      children: [
        { index: true, loader: () => redirect(ROUTE_PATH.USERS) },
        { path: ROUTE_PATH.USERS, element: <UsersPage /> },
        { path: ROUTE_PATH.BOARD, element: <BoardPage /> },
        { path: ROUTE_PATH.BOARDS, element: <BoardsPage /> },
        {
          path: ROUTE_PATH.AUTH,
          element: <AuthPage />,
          loader: () => {
            if (isSignIn()) {
              return redirect(ROUTE_PATH.USERS);
            }
            return null;
          },
        },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);

export function AppRouter() {
  const { isSignIn } = useCheckSignIn();
  return <RouterProvider router={router(isSignIn)} />;
}
