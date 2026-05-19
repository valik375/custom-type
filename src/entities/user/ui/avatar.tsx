import clsx from "clsx";
import { type Profile } from "@/entities/user/model/types";

interface AvatarProps {
  className?: string;
  size?: 1 | 2 | 3 | 4;
  user: Profile;
}

export function Avatar({ className, user, size = 1 }: AvatarProps) {
  const [firstName, lastName] = user.name.split(" ");
  const avatarShortName = (firstName?.[0] || "") + (lastName?.[0] || "");

  const avatarSize = {
    1: "min-w-10 w-10 h-10",
    2: "min-w-12 w-12 h-12",
    3: "min-w-14 w-14 h-14",
    4: "min-w-16 w-16 h-16",
  };

  const avatarTextSize = {
    1: "text-sm",
    2: "text-lg",
    3: "text-xl",
    4: "text-2xl",
  };

  return (
    <div
      className={clsx(
        className,
        avatarSize[size],
        "flex items-center justify-center border border-(--color-primary) rounded overflow-hidden",
      )}
    >
      {user.avatarUrl ? (
        <img
          className="w-full h-full object-cover"
          src={user.avatarUrl}
          alt={user.name}
        />
      ) : (
        <span
          className={clsx(
            avatarTextSize[size],
            "text-(--text-primary) capitalize",
          )}
        >
          {avatarShortName}
        </span>
      )}
    </div>
  );
}
