import { createBrowserRouter } from "react-router";
import { ProtectedRoute } from "./protected-route";

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
            HydrateFallback: () => <div>Loading</div>,
            lazy: () =>
              import("@/pages/home").then((module) => ({
                Component: module.default,
              })),
          },
          {
            path: "/login",
            HydrateFallback: () => <div>Loading</div>,
            lazy: () =>
              import("@/pages/login").then((module) => ({
                Component: module.default,
              })),
          },
          {
            path: "/profile",
            HydrateFallback: () => <div>Loading</div>,
            lazy: () =>
              import("@/pages/profile").then((module) => ({
                Component: () => (
                  <ProtectedRoute>
                    <module.default />
                  </ProtectedRoute>
                ),
              })),
          },
        ],
      },
    ],
  },
]);

export default router;
