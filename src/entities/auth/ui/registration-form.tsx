import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../model/schemas";
import { type RegisterFormValues } from "../model/types";

import { BaseForm } from "@/shared/ui";

interface RegistrationFormProps {
  onSubmit: (data: RegisterFormValues) => void;
}

function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="w-full h-full">
      <BaseForm.Root>
        <BaseForm.Section className="h-full">
          <BaseForm.Title>Register</BaseForm.Title>
          <BaseForm.Input
            type="text"
            placeholder="Username"
            {...register("username")}
            disabled={isSubmitting}
            error={errors?.username?.message}
          />
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
          <BaseForm.Input
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword")}
            disabled={isSubmitting}
            error={errors?.confirmPassword?.message}
          />
        </BaseForm.Section>
        <BaseForm.Section>
          <BaseForm.Button
            disabled={isSubmitting}
            onClick={() => handleSubmit(onSubmit)}
          >
            Register
          </BaseForm.Button>
        </BaseForm.Section>
      </BaseForm.Root>
    </div>
  );
}

export default RegistrationForm;
