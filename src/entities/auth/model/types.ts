import { z } from "zod";
import { loginSchema, registrationSchema } from "./schemas";

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registrationSchema>;
