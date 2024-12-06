import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { ROUTE_PATH } from "../../../shared/constants/routes";

export function NavLinks() {
  const linkClassName = ({ isActive }: { isActive?: boolean }) =>
    classNames(isActive && "underline");

  return (
    <div className="text-lg flex gap-5">
      <NavLink to={ROUTE_PATH.USERS} className={linkClassName}>
        Пользователи
      </NavLink>
      <NavLink to={ROUTE_PATH.BOARDS} className={linkClassName}>
        Доски
      </NavLink>
    </div>
  );
}
