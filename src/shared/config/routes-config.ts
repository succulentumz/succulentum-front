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
} satisfies Record<string, IRouteConfigParams>;

export type IRouteName = keyof typeof routesConfig;
