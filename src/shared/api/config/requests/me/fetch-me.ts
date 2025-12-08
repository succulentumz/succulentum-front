import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { meRaw } from '../../fixtures/me';
import { mapperMe } from '../../mappers';
import { type IMeRaw } from '../../model';

export type IFetchMeResponse = IMeRaw;

export const meFetchKey = 'fetchMe' as const;

export default createFetchConfig(meFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/users/api/me',
    method: 'GET',
  },
  getRequestOptions: () => ({
    mapper: mapperMe,
  }),
  mockValue: meRaw,
});
