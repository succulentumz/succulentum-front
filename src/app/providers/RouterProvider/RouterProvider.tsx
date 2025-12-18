import { type FC, Suspense, lazy } from 'react';
import {
  type RouteObject,
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
  Outlet,
  NavLink,
} from 'react-router-dom';

import { type IRouteName, routesConfig } from '@/shared/config';
import { objectKeys } from '@/shared/helpers';
import { Loader, renderEmojiIcon } from '@/shared/ui';

import useStyles from './RouterProvider.styles';

const NotFoundPage = lazy(() =>
  import('@/pages/notFound').then((module) => ({ default: module.NotFoundPage })),
);

const CollectionPage = lazy(() =>
  import('@/pages/collection').then((module) => ({ default: module.CollectionPage })),
);

const RegistrationPage = lazy(() =>
  import('@/pages/registration').then((module) => ({ default: module.RegistrationPage })),
);

const HomePage = lazy(() =>
  import('@/pages/homePage').then((module) => ({ default: module.HomePage })),
);

const UserPage = lazy(() =>
  import('@/pages/userPage').then((module) => ({ default: module.UserPage })),
);

const SharedCollectionPage = lazy(() =>
  import('@/pages/sharedCollection').then((module) => ({ default: module.SharedCollectionPage })),
);

const GraveyardPage = lazy(() =>
  import('@/pages/graveyard').then((module) => ({ default: module.GraveyardPage })),
);

const routesComponents = {
  main: HomePage,
  collection: CollectionPage,
  login: RegistrationPage,
  user: UserPage,
  shared: SharedCollectionPage,
  graveyard: GraveyardPage,
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
        <NavLink to="/graveyard" className={classes.tab}>
          Кладбище
        </NavLink>
        <NavLink to="/user" className={classes.tab}>
          Пользователь
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

const NoHeaderLayout = () => {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <Outlet />
    </div>
  );
};

export const routes: RouteObject[] = [
  {
    id: 'App',
    element: <Layout />,
    errorElement: <NotFoundPage />,

    children: objectKeys(routesConfig)
      .filter((name) => name !== 'login' && name !== 'user')
      .map((name) => {
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
  {
    id: 'User',
    element: <NoHeaderLayout />,
    errorElement: <NotFoundPage />,

    children: [
      {
        id: 'user',
        path: '/user',
        element: (
          <Suspense fallback={<Loader />}>
            <UserPage />
          </Suspense>
        ),
        errorElement: <NotFoundPage />,
      },
    ],
  },
  {
    id: 'Auth',
    element: <NoHeaderLayout />,
    errorElement: <NotFoundPage />,

    children: [
      {
        id: 'login',
        path: '/login',
        element: (
          <Suspense fallback={<Loader />}>
            <RegistrationPage />
          </Suspense>
        ),
        errorElement: <NotFoundPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, { basename: import.meta.env.BASE_URL });

export const RouterProvider = () => <ReactRouterProvider router={router} />;
