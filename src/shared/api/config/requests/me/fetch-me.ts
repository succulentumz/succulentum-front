import { meRaw } from '@/shared/api/config/fixtures/me';

import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { mapperMe } from '../../mappers';
import { type IMeRaw } from '../../model';

export type IFetchMeResponse = IMeRaw;

export const meFetchKey = 'fetchMe' as const;

export default createFetchConfig(meFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/me',
    method: 'GET',
  },
  getRequestOptions: () => ({
    mapper: mapperMe,
  }),
  mockValue: meRaw,
});
