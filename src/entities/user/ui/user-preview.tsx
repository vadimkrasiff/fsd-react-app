import classNames from "classnames";
import { User } from "../model/types";
import { getAvatarUrl } from "./get-avatar-url";

export const UserPreview = ({
  name,
  avatarId,
  className,
}: { className?: string } & User) => {
  return (
    <div className={classNames(className, "flex items-center gap-2")}>
      <img style={{ height: 45 }} src={getAvatarUrl(avatarId)} />
      <span>{name}</span>
    </div>
  );
};
