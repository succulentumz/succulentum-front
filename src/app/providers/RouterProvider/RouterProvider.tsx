import { IRouteName, routesConfig } from '@/shared/config';
import { objectKeys } from '@/shared/helpers';
import { Loader } from '@/shared/ui';
import { FC, Suspense, lazy } from 'react';
import {
  RouteObject,
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from 'react-router-dom';

const NotFoundPage = lazy(() =>
  import('@/pages/notFound').then((module) => ({ default: module.NotFoundPage })),
);

const routesComponents = { main: NotFoundPage } satisfies Record<IRouteName, FC>;

export const routes: RouteObject[] = [
  {
    id: 'App',
    errorElement: <NotFoundPage />,

    children: objectKeys(routesConfig).map((name) => {
      const RouteComponent = routesComponents[name];

      return {
        id: name,
        path: routesConfig[name].path,
        element: (
          <Suspense fallback={<Loader />}>
            <RouteComponent />
          </Suspense>
        ),
        errorElement: <NotFoundPage />,
      };
    }),
  },
];

const router = createBrowserRouter(routes, { basename: import.meta.env.BASE_URL });

export const RouterProvider = () => <ReactRouterProvider router={router} />;
