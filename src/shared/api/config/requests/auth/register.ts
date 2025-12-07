import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { meRaw } from '../../fixtures/me';
import { mapperMe } from '../../mappers';
import { type IRegisterMe } from '../../model';

export type IRegisterRequest = Omit<IRegisterMe, 'id' | 'createdAt' | 'updatedAt'>;

export const registerKey = 'register' as const;

export default createFetchConfig(registerKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/auth/register',
    method: 'POST',
  },
  getRequestOptions: (body: IRegisterRequest) => ({
    body,
    mapper: mapperMe,
  }),
  mockValue: meRaw,
});
