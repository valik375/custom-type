import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../model/schemas";
import { type LoginFormValues } from "../model/types";

import { BaseForm } from "@/shared/ui";

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => void;
}

function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="w-full h-full">
      <BaseForm.Root>
        <BaseForm.Section className="h-full">
          <BaseForm.Title>Login</BaseForm.Title>
          <BaseForm.Input
            type="email"
            placeholder="Email"
            {...register("email")}
            disabled={isSubmitting}
            error={errors?.email?.message}
          />
          <BaseForm.Input
            type="password"
            placeholder="Password"
            {...register("password")}
            disabled={isSubmitting}
            error={errors?.password?.message}
          />
        </BaseForm.Section>
        <BaseForm.Section>
          <BaseForm.Button
            disabled={isSubmitting}
            onClick={() => handleSubmit(onSubmit)}
          >
            Login
          </BaseForm.Button>
        </BaseForm.Section>
      </BaseForm.Root>
    </div>
  );
}

export default LoginForm;
