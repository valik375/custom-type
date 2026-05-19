import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Invalid email"),
  password: z.string().trim().min(1, "Password is required"),
});

export const registrationSchema = z
  .object({
    name: z.string().trim().min(1, "Username is required"),
    email: z.string().trim().min(1, "Email is required").email("Invalid email"),
    password: z.string().trim().min(1, "Password is required"),
    passwordConfirm: z.string().trim().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });
