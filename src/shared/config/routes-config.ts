export interface IRouteConfigParams {
  path: string;
  isIndex: boolean;
}

export const routesConfig = {
  main: {
    path: '/',
    isIndex: false,
  },
  collection: {
    path: '/collection/*',
    isIndex: true,
  },
  login: {
    path: '/login',
    isIndex: false,
  },
  user: {
    path: '/user',
    isIndex: false,
  },
  shared: {
    path: '/shared',
    isIndex: false,
  },
  graveyard: {
    path: '/graveyard',
    isIndex: false,
  },
} satisfies Record<string, IRouteConfigParams>;

export type IRouteName = keyof typeof routesConfig;
