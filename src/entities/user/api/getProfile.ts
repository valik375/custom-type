import { ProfileDotSchema } from "../model/schema";
import { type Profile } from "../model/types";
import { apiGet, apiPost, type ApiOptions } from "@/shared/lib/api/client";

export const getProfile = async (
  profileId: string,
  options?: ApiOptions,
): Promise<Profile[]> => {
  const data = await apiGet<Profile[]>(`/users/${profileId}`, options);
  return ProfileDotSchema.array().parse(data);
};

export const createProfile = async (body: Profile): Promise<Profile> => {
  const data = await apiPost<Profile>("/users", body);
  return ProfileDotSchema.parse(data);
};
