import { z } from "zod";

export const UpdateProfileFieldsSchema = z.object({
  name: z.string(),
  avatar: z.file().nullable(),
});
