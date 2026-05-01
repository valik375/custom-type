import clsx from "clsx";
import { Avatar } from "./avatar";
import { type Profile } from "@/entities/user/model/types";

interface ProfileProps {
  className?: string;
  avatarClassName?: string;
  user: Profile;
}

export function Profile({ className, avatarClassName, user }: ProfileProps) {
  return (
    <div className={clsx(className, "h-full max-h-16 flex items-center gap-3")}>
      <Avatar className={avatarClassName} user={user} />
      <div className="text-md font-semibold text-(--text-primary) cursor-pointer">
        {user.name}
      </div>
    </div>
  );
}
