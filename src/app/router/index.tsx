import { createBrowserRouter } from "react-router";

import RootLayout from "@/app/layout/root-layout";
import AppLayout from "@/app/layout/app-layout";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            lazy: () =>
              import("@/pages/home").then((module) => ({
                Component: module.default,
              })),
          },
          {
            path: "/login",
            lazy: () =>
              import("@/pages/login").then((module) => ({
                Component: module.default,
              })),
          },
        ],
      },
    ],
  },
]);

export default router;
