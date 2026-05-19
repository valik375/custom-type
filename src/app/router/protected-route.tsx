import { Navigate } from "react-router";

import { useCurrentUser } from "@/entities/user";

type Props = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
  const { data: user } = useCurrentUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
