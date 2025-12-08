import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { meRaw } from '../../fixtures/me';
import { mapperMe } from '../../mappers';
import { type IMe, type IRegisterMe } from '../../model';

export type IRegisterRequest = Omit<IRegisterMe, 'id' | 'createdAt' | 'updatedAt'>;

export type IRegisterResponse = IMe;

export const registerKey = 'register' as const;

export default createFetchConfig(registerKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/auth/register',
    method: 'POST',
  },
  getRequestOptions: (body: IRegisterRequest) => ({
    body,
    mapper: mapperMe,
  }),
  mockValue: meRaw,
});
