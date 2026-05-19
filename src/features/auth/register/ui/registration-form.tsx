import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { registrationSchema } from "@/entities/auth/model/schemas";
import { registerProfile, authWithPassword } from "@/entities/auth/api/auth";

import useToast from "@/shared/lib/toast/api/useToast";
import { BaseForm } from "@/shared/ui";

import {
  type RegisterFormValues,
  type AuthWithPasswordType,
} from "@/entities/auth/model/types";

function RegistrationForm() {
  const navigate = useNavigate();
  const toast = useToast();

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormValues) => {
      const response = await registerProfile(data);
      return response;
    },
    onSuccess: () => {
      toast.show({
        title: "Success",
        message: "You have been logged in successfully",
        type: "success",
      });
    },
    onError: (error) => {
      const apiError = error as Error & {
        data: Record<string, { message: string }>;
      };
      const message = Object.values(apiError.data)
        .map(({ message }: { message: string }) => message)
        .join(", ");

      toast.show({
        title: apiError.message,
        message: message,
        type: "error",
      });
    },
  });

  const authWithPasswordMutation = useMutation({
    mutationFn: async (data: AuthWithPasswordType) => {
      const response = await authWithPassword(data);
      return response;
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      const apiError = error as Error & {
        data: Record<string, { message: string }>;
      };
      const message = Object.values(apiError.data)
        .map(({ message }: { message: string }) => message)
        .join(", ");

      toast.show({
        title: apiError.message,
        message: message,
        type: "error",
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const res = await registerMutation.mutateAsync(data);
      if (res) {
        await authWithPasswordMutation.mutateAsync({
          identity: data.email,
          password: data.password,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full">
      <BaseForm.Root>
        <BaseForm.Section className="h-full">
          <BaseForm.Title>Register</BaseForm.Title>
          <BaseForm.Input
            type="text"
            placeholder="Username"
            {...register("name")}
            disabled={isSubmitting}
            error={errors?.name?.message}
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
            {...register("passwordConfirm")}
            disabled={isSubmitting}
            error={errors?.passwordConfirm?.message}
          />
        </BaseForm.Section>
        <BaseForm.Section>
          <BaseForm.Button
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            Register
          </BaseForm.Button>
        </BaseForm.Section>
      </BaseForm.Root>
    </div>
  );
}

export default RegistrationForm;
