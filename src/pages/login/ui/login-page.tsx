import { LoginForm, RegistrationForm } from "@/entities/auth";

function LoginPage() {
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
