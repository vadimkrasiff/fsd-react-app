import { Breadcrumbs, Typography } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { ROUTE_NAME } from "../../../shared/constants/routes";
import { useMemo } from "react";
import { useBreadcrumbs } from "../../../entities/breadcrumbs/model/breadcrumbs.store";

const useBreadcrumb = () => {
  const location = useLocation();
  const { currentPath } = useBreadcrumbs();

  const pathArray = useMemo(
    () =>
      location.pathname
        .split("/") // Разделяем путь на части
        .reduce<{ path: string; name: string | null }[]>(
          (acc, segment, index) => {
            const previousPath = acc[index - 1]?.path || "";
            const currentPath = `${previousPath}/${segment}`.replace(
              /\/\//g,
              "/",
            );

            const pathes = currentPath.split("/");
            const lastPath = pathes[pathes.length - 1];
            const pathValue = {
              path: currentPath,
              name: ROUTE_NAME[lastPath] || lastPath,
            };

            acc.push(pathValue);
            return acc;
          },
          [],
        ),
    [location.pathname],
  );

  const breadcrumbs = useMemo(
    () =>
      pathArray.map((path, index, array) => {
        if (path.name === null) {
          console.log(path);
          return null;
        }
        return index !== array.length - 1 ? (
          <NavLink key={path.path} to={path.path}>
            <Typography>{path.name}</Typography>
          </NavLink>
        ) : (
          <Typography color="textPrimary" key={path.path}>
            {currentPath || path.name}
          </Typography>
        );
      }),
    [currentPath, pathArray],
  );

  return { breadcrumbs };
};

export function UIBreadcrumbs() {
  const { breadcrumbs } = useBreadcrumb();

  return <Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>;
}
