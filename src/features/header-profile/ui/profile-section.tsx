import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  useCurrentUser,
  clearUserId,
} from "@/entities/user/api/use-current-user";
import { User, LogOut } from "lucide-react";

import { logoutProfile } from "@/entities/auth";

import { Profile } from "@/entities/user";
import Dropdown from "@/shared/ui/dropdown";

function ProfileSection() {
  const { data: user } = useCurrentUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const onLogout = () => {
    clearUserId();
    logoutProfile();
    queryClient.clear();
    navigate("/login");
  };

  return (
    <Dropdown className="h-full">
      <Dropdown.Trigger className="h-full px-4">
        <Profile user={user} />
      </Dropdown.Trigger>
      <Dropdown.Body align="left">
        <Dropdown.Item onClick={() => navigate("/profile")}>
          <div className="flex items-center gap-4">
            <User />
            Profile
          </div>
        </Dropdown.Item>
        <Dropdown.Item onClick={onLogout}>
          <div className="flex items-center gap-4">
            <LogOut />
            Logout
          </div>
        </Dropdown.Item>
      </Dropdown.Body>
    </Dropdown>
  );
}

export default ProfileSection;
