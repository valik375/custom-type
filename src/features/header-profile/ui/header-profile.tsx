import { useNavigate } from "react-router";
import { Profile } from "@/entities/user";
import { User } from "lucide-react";

export function HeaderProfile() {
  const navigate = useNavigate();
  // const user = {
  //   id: "asdasd-asdasd-asd",
  //   name: "Adam Frick",
  //   email: "adam@frick.com",
  //   avatar: null,
  // };

  const user = null;

  return (
    <div className="h-full flex items-center border-l border-(--color-primary)">
      {user ? (
        <div className="px-4">
          <Profile user={user} />
        </div>
      ) : (
        <div
          className="w-14 h-full max-h-22 flex items-center justify-center text-(--text-primary) cursor-pointer"
          onClick={() => navigate("/login")}
        >
          <User width={22} height={22} />
        </div>
      )}
    </div>
  );
}
