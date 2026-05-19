import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateProfileFieldsSchema } from "../model/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/entities/user";
import { updateProfile } from "../api/updateProfile";
import useToast from "@/shared/lib/toast/api/useToast";

import Drawer from "@/shared/ui/drawer";
import { BaseFileInput, BaseInput } from "@/shared/ui/forms";

import {
  type UpdateProfileFieldsType,
  type UpdateProfileParams,
} from "../model/types";
import { type Profile } from "@/entities/user/model/types";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUser();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<UpdateProfileFieldsType>({
    resolver: zodResolver(UpdateProfileFieldsSchema),
    defaultValues: {
      name: user?.name,
      avatar: null,
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (data: UpdateProfileParams) => {
      const updatedUser: Profile = await updateProfile(data);

      if (updatedUser) {
        const collection = updatedUser.collectionName || "users";
        updatedUser.avatarUrl = updatedUser.avatar
          ? `http://127.0.0.1:8090/api/files/${collection}/${updatedUser.id}/${updatedUser.avatar}`
          : "";
      }
      queryClient.setQueryData(["currentUser", updatedUser.id], updatedUser);
      return updatedUser;
    },
    onSuccess: () => {
      toast.show({
        title: "Update Profile",
        message: "Profile updated successfully",
        type: "success",
      });
      onClose();
    },
    onError: (error) => {
      const apiError = error as Error & {
        data: Record<string, { message: string }>;
      };
      const message = Object.values(apiError.data)
        .map(({ message }: { message: string }) => message)
        .join(", ");

      toast.show({
        title: "Update Profile",
        message: message,
        type: "error",
      });
    },
  });

  const onSubmit = async (data: UpdateProfileFieldsType) => {
    try {
      await updateUserMutation.mutateAsync({ userId: user?.id ?? "", data });
    } catch (error: unknown) {
      console.error(error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Drawer isOpen={isOpen} close={onClose}>
      <Drawer.Header title="Update Profile" />
      <Drawer.Section>
        <Controller
          control={control}
          name="avatar"
          render={({ field }) => (
            <BaseFileInput
              avatarUrl={user?.avatarUrl}
              multiple={false}
              error={errors.avatar?.message}
              onChange={(event) => {
                const file = event.target.files?.[0] ?? null;
                field.onChange(file);
              }}
            />
          )}
        />
        <BaseInput
          placeholder="Enter your name"
          {...register("name")}
          error={errors.name?.message}
        />
      </Drawer.Section>
      <Drawer.Footer className="flex itemsitems-center">
        <Drawer.Button
          onClick={handleSubmit(onSubmit)}
          disabled={!isDirty || isSubmitting}
        >
          Update
        </Drawer.Button>
        <Drawer.Button onClick={onClose} disabled={isSubmitting}>
          Close
        </Drawer.Button>
      </Drawer.Footer>
    </Drawer>
  );
}

export default EditProfileModal;
