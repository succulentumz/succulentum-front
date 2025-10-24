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
  registration: {
    path: '/login',
    isIndex: false,
  },
} satisfies Record<string, IRouteConfigParams>;

export type IRouteName = keyof typeof routesConfig;
