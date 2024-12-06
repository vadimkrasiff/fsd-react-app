import { useSession } from "../../../entities/session";
import { getAvatarUrl } from "../../../entities/user";

export function Profile() {
  const { currenSession } = useSession();

  if (!currenSession) return null;

  return (
    <div className="flex gap-2 items-center justify-end">
      <img className="w-8 h-8" src={getAvatarUrl(currenSession.avatarId)} />
      <div className="text-lg">{currenSession.name}</div>
    </div>
  );
}
