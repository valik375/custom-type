import clsx from "clsx";
import { Avatar } from "./avatar";
import { type Profile } from "@/entities/user/model/types";

interface ProfileProps {
  className?: string;
  avatarClassName?: string;
  user: Profile;
  size?: 1 | 2 | 3 | 4;
}

export function Profile({
  className,
  avatarClassName,
  user,
  size = 1,
}: ProfileProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const avatarTextSize = {
    1: "text-sm",
    2: "text-lg",
    3: "text-xl",
    4: "text-2xl",
  };

  return (
    <div className={clsx(className, "h-full max-h-16 flex items-center gap-3")}>
      <Avatar className={avatarClassName} user={user} size={size} />
      <div className="flex flex-col">
        <div
          className={clsx(
            avatarTextSize[size],
            "font-semibold text-(--text-primary) line-clamp-1",
          )}
          title={user.name}
        >
          {user.name}
        </div>
        <div className="text-xs font-light text-(--text-secondary)!">
          {formatDate(user.created)}
        </div>
      </div>
    </div>
  );
}
