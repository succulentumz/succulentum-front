import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { loginRaw } from '../../fixtures/login';
import { type IRegisterMe } from '../../model';

export type ILoginRequest = Omit<IRegisterMe, 'id' | 'createdAt' | 'updatedAt' | 'email'>;

export const loginKey = 'login' as const;

export default createFetchConfig(loginKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/auth/login',
    method: 'POST',
  },
  getRequestOptions: (body: ILoginRequest) => ({
    body,
    mapper: (v) => v,
  }),
  mockValue: loginRaw,
});
