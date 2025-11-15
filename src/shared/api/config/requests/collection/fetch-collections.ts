import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { collectionsRaw } from '../../fixtures/collections';
import { mapperCollection } from '../../mappers';
import { type ICollectionRaw } from '../../model';

export type IFetchCollectionsResponse = ICollectionRaw[];

export const collectionsFetchKey = 'fetchCollections' as const;

export default createFetchConfig(collectionsFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/collections',
    method: 'GET',
  },
  getRequestOptions: () => ({
    mapper: (response: IFetchCollectionsResponse) => response.map(mapperCollection),
  }),
  mockValue: collectionsRaw,
});
