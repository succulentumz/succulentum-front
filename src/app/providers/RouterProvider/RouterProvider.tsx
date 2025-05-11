import { IRouteName, routesConfig } from '@/shared/config';
import { objectKeys } from '@/shared/helpers';
import { Loader, renderEmojiIcon } from '@/shared/ui';
import { FC, Suspense, lazy } from 'react';
import {
  RouteObject,
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
  Outlet,
  NavLink,
} from 'react-router-dom';
import useStyles from './RouterProvider.styles';

const NotFoundPage = lazy(() =>
  import('@/pages/notFound').then((module) => ({ default: module.NotFoundPage })),
);

const CollectionPage = lazy(() =>
  import('@/pages/collection').then((module) => ({ default: module.CollectionPage })),
);

const routesComponents = {
  main: NotFoundPage,
  collection: CollectionPage,
} satisfies Record<IRouteName, FC>;

const Header: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <div className={classes.logo}>{renderEmojiIcon('succulentumLogo')}</div>
      <div className={classes.tabsContainer}>
        <NavLink to="/collection" className={classes.tab}>
          Каталог
        </NavLink>
      </div>
    </div>
  );
};

const Layout = () => {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <Header />
      <Outlet />
    </div>
  );
};

export const routes: RouteObject[] = [
  {
    id: 'App',
    element: <Layout />,
    errorElement: <NotFoundPage />,

    children: objectKeys(routesConfig).map((name) => {
      const RouteComponent = routesComponents[name];

      return {
        id: name,
        path: routesConfig[name].path,
        index: routesConfig[name].isIndex,
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
