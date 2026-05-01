import { z } from "zod";

export const ProfileDotSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string().nullish(),
  email: z.string(),
});
