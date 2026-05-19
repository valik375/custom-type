import { ProfileDotSchema } from "../model/schema";
import { type Profile } from "../model/types";
import { apiGet, apiPost, type ApiOptions } from "@/shared/lib/api/client";

export const getUser = async (
  userId: string,
  options?: ApiOptions,
): Promise<Profile> => {
  const data = await apiGet<Profile[]>(
    `/collections/users/records/${userId}`,
    options,
  );
  return ProfileDotSchema.parse(data);
};

export const createProfile = async (body: Profile): Promise<Profile> => {
  const data = await apiPost<Profile>("/users", body);
  return ProfileDotSchema.parse(data);
};
