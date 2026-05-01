import { useNavigate } from "react-router";
import { HeaderProfile } from "@/features/header-profile";
import { Logo } from "@/shared/ui";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="h-16 px-3 border-b border-(--color-primary)">
      <div className="w-full h-full flex items-center">
        <div className="h-full cursor-pointer" onClick={() => navigate("/")}>
          <Logo className="h-full flex items-center pr-4 border-r border-(--color-primary)" />
        </div>
        <div className="h-full ml-auto">
          <HeaderProfile />
        </div>
      </div>
    </div>
  );
}

export default Header;
