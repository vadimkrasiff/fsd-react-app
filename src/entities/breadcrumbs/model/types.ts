export type currentPathType = {
  name: string;
  path: string;
};
export type BreadcrumbsType = {
  currentPath: currentPathType;
  breadcrumbs: currentPathType[];
};
