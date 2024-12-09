import { ReactNode } from "react";

export function UIHeader(props: {
  links?: ReactNode;
  profile: ReactNode;
  crumbs?: ReactNode;
}) {
  return (
    <header
      style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.23)" }}
      className="w-full flex flex-col p-4 gap-5"
    >
      <div className="w-full flex items-center justify-between gap-3">
        <span className="font-bold text-3xl text-blue-600">DashBoard</span>
        {props.links}
        {props.profile}
      </div>
      <div>{props.crumbs}</div>
    </header>
  );
}
