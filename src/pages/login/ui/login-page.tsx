import { Navigate } from "react-router";
import { useCurrentUser } from "@/entities/user";

import LoginForm from "@/features/auth/login";
import RegistrationForm from "@/features/auth/register";

function LoginPage() {
  const { data: user } = useCurrentUser();

  if (user) {
    return <Navigate to="/profile" />;
  }

  return (
    <div
      style={{ height: "calc(100% - 60px)" }}
      className="h-full flex items-stretch"
    >
      <RegistrationForm />
      <LoginForm />
    </div>
  );
}

export default LoginPage;
