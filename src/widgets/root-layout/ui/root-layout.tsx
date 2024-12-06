import { Outlet } from "react-router-dom";
import { UIHeader } from "../../../shared/ui/layouts/ui-header";
import { NavLinks } from "./nav-links";
import { Profile } from "./profile";

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <UIHeader links={<NavLinks />} profile={<Profile />} />
      <main className="grow p-4">
        <Outlet />
      </main>
    </div>
  );
}
