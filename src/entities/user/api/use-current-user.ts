import { useSyncExternalStore } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "./userApi";

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("storage", callback);
  };
};

const getUserId = () => {
  return localStorage.getItem("userId");
};

export const setUserId = (id: string) => {
  localStorage.setItem("userId", id);
  window.dispatchEvent(new Event("storage"));
};

export const clearUserId = () => {
  localStorage.removeItem("userId");
  window.dispatchEvent(new Event("storage"));
};

export const useCurrentUser = () => {
  const userId = useSyncExternalStore(subscribe, getUserId);
  return useQuery({
    queryKey: ["currentUser", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("No userId");
      }
      const user = await getUser(userId);
      if (user) {
        const collection = user.collectionName || "users";
        user.avatarUrl = user.avatar
          ? `http://127.0.0.1:8090/api/files/${collection}/${user.id}/${user.avatar}`
          : "";
      }
      return user;
    },
    staleTime: 1000,
    retry: false,
    retryOnMount: false,
    enabled: !!userId,
  });
};
