import { collectionsRaw } from '@/shared/api/config/fixtures/collections';

import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { mapperCollection } from '../../mappers';
import { type ICollection } from '../../model';

export interface IFetchSharedCollectionRequest {
  token: ICollection['sharedLink'];
}

export const sharedCollectionFetchKey = 'fetchSharedCollection' as const;

export default createFetchConfig(sharedCollectionFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/shared/collections/:token',
    method: 'GET',
  },
  getRequestOptions: ({ token }: IFetchSharedCollectionRequest) => ({
    params: { token },
    mapper: mapperCollection,
  }),
  mockValue: collectionsRaw[0],
});
