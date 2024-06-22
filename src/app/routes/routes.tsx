import { useMemo } from "react";
import { RoutePaths } from "./RoutePaths";
import configuredAsyncComponentLoader from "@/shared/lib/loader";
import { useRoutes } from "react-router-dom";

const AppShell = configuredAsyncComponentLoader(() => import("./AppShell"));

const PageRoute = configuredAsyncComponentLoader(() => import("./PageRoute"));

const HomeScreen = configuredAsyncComponentLoader(
  () => import("@/features/Home"),
);

const EmployeesScreen = configuredAsyncComponentLoader(
  () => import("@/features/Employees"),
);

const NotFoundScreen = configuredAsyncComponentLoader(
  () => import("@/features/NotFound"),
);

const Routes = () => {
  const mainRoutes = useMemo(
    () => [
      {
        path: RoutePaths.HOME,
        element: <AppShell />,
        children: [
          {
            path: RoutePaths.HOME,
            element: <PageRoute Component={HomeScreen} />,
          },
          {
            path: RoutePaths.Employees,
            element: <PageRoute Component={EmployeesScreen} />,
          },
          {
            path: "*",
            element: <NotFoundScreen />,
          },
        ],
      },
    ],
    [],
  );

  return useRoutes(mainRoutes);
};

export default Routes;
