import clsx from "clsx";
import { type Profile } from "@/entities/user/model/types";

interface AvatarProps {
  className?: string;
  user: Profile;
}

export function Avatar({ className, user }: AvatarProps) {
  const [firstName, lastName] = user.name.split(" ");
  const avatarShortName = (firstName[0] || "") + (lastName[0] || "");

  return (
    <div
      className={clsx(
        className,
        "w-10 h-10 flex items-center justify-center border border-(--color-primary) rounded overflow-hidden",
      )}
    >
      {user.avatar ? (
        <img
          className="w-full h-full object-cover"
          src={user.avatar}
          alt={user.name}
        />
      ) : (
        <span className="text-(--text-primary)">{avatarShortName}</span>
      )}
    </div>
  );
}
