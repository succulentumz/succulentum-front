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
    isIndex: false,
  },
  login: {
    path: '/login',
    isIndex: false,
  },
  user: {
    path: '/user',
    isIndex: true,
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
