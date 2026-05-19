import { z } from "zod";
import { UpdateProfileFieldsSchema } from "./schema";

export type EditProfileState = {
  isEditModalOpen: boolean;
};

export type UpdateProfileFieldsType = z.infer<typeof UpdateProfileFieldsSchema>;

export type UpdateProfileParams = {
  userId: string;
  data: UpdateProfileFieldsType;
};

