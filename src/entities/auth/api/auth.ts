import { apiPost } from "@/shared/lib/api/client";
import {
  type RegisterFormValues,
  type AuthWithPasswordType,
} from "@/entities/auth/model/types";

export const registerProfile = async (data: RegisterFormValues) => {
  const response = await apiPost("/collections/users/records", data);
  return response;
};

export const authWithPassword = async (data: AuthWithPasswordType) => {
  const response = await apiPost("/collections/users/auth-with-password", data);
  localStorage.setItem("userId", response?.record?.id || "");
  localStorage.setItem("userToken", response?.token || "");
  return response;
};

export const logoutProfile = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("userToken");
};
