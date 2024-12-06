import { ReactNode } from "react";

export function UIHeader(props: { links: ReactNode; profile: ReactNode }) {
  return (
    <header
      style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.23)" }}
      className="flex items-center justify-between p-4"
    >
      <span className="font-bold text-3xl text-blue-600">DashBoard</span>
      {props.links}
      {props.profile}
    </header>
  );
}
