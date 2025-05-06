import { type environments } from './environment-config';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: (typeof environments)[keyof typeof environments];
      APP_BASE?: string;
      GATEWAY_URL?: string;
    }
  }
}
