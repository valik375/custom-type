import { Outlet } from "react-router";
import { useCurrentUser } from "@/entities/user";

function RootLayout() {
  const { isLoading } = useCurrentUser();

  if (isLoading) {
    return <div>Loading</div>;
  }

  return <Outlet />;
}

export default RootLayout;
