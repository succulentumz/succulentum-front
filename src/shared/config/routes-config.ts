export interface IRouteConfigParams {
  path: string;
}

export const routesConfig = {
  main: {
    path: '/',
  },
} satisfies Record<string, IRouteConfigParams>;

export type IRouteName = keyof typeof routesConfig;
