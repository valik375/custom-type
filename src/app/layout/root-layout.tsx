import { Outlet } from "react-router";

// import { useMutation, useQuery } from "@tanstack/react-query";
// import { getProfile, createProfile } from "@/entities/user/api/getProfile";

function RootLayout() {
  // const query = useQuery({
  //   queryKey: ["profile"],
  //   queryFn: () => getProfile("Cn7pi3vS64A"),
  // });

  // const res = mutation.mutate({
  //   id: uuidv4(),
  //   name: "Adam",
  //   avatar: null,
  //   email: "adam@example.com",
  // });

  // console.log(query);
  return <Outlet />;
}

export default RootLayout;
