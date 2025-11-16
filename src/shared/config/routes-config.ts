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
  shared: {
    path: '/shared',
    isIndex: false,
  },
} satisfies Record<string, IRouteConfigParams>;

export type IRouteName = keyof typeof routesConfig;
