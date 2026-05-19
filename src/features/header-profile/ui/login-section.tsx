import { useNavigate } from "react-router";
import { User } from "lucide-react";

function LoginSection() {
  const navigate = useNavigate();

  return (
    <div
      className="w-14 h-full max-h-22 flex items-center justify-center text-(--text-primary) cursor-pointer"
      onClick={() => navigate("/login")}
    >
      <User width={22} height={22} />
    </div>
  );
}

export default LoginSection