import { apiPatch } from "@/shared/lib/api/client";
import { toFormData } from "@/shared/lib/utils";

import { type UpdateProfileParams } from "../model/types";

export const updateProfile = async ({ userId, data }: UpdateProfileParams) => {
  const formData = toFormData(data);

  const response = await apiPatch(
    `/collections/users/records/${userId}`,
    formData,
  );
  return response;
};
