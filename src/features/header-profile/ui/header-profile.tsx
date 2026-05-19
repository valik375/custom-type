import { useCurrentUser } from "@/entities/user/api/use-current-user";
import LoginSection from "./login-section";
import ProfileSection from "./profile-section";

export function HeaderProfile() {
  const { data: user } = useCurrentUser();

  return (
    <div className="max-w-50 h-full flex items-center border-l border-(--color-primary)">
      {user ? <ProfileSection /> : <LoginSection />}
    </div>
  );
}
