import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { setUserId } from "@/entities/user/api/use-current-user";
import useToast from "@/shared/lib/toast/api/useToast";

import { authWithPassword } from "@/entities/auth/api/auth";
import { loginSchema } from "@/entities/auth/model/schemas";
import {
  type LoginFormValues,
  type AuthWithPasswordType,
} from "@/entities/auth/model/types";

import { BaseForm } from "@/shared/ui";

function LoginForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();

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

  const authWithPasswordMutation = useMutation({
    mutationFn: async (data: AuthWithPasswordType) => {
      const response = await authWithPassword(data);

      if (response?.record) {
        setUserId(response?.record.id);
        const collection = response.record.collectionName || "users";
        response.record.avatarUrl = response.record.avatar
          ? `http://127.0.0.1:8090/api/files/${collection}/${response.record.id}/${response.record.avatar}`
          : "";
      }

      queryClient.setQueryData(["currentUser"], response.record);
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

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await authWithPasswordMutation.mutateAsync({
        identity: data.email,
        password: data.password,
      });
    } catch (error) {
      console.error(error);
    }
  };

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
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </BaseForm.Button>
        </BaseForm.Section>
      </BaseForm.Root>
    </div>
  );
}

export default LoginForm;
