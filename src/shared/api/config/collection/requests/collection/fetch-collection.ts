import { hosts } from '../../../../../config';
import { createFetchConfig } from '../../../../helpers';
import { collectionRaw } from '../../fixtures/collections';
import { mapperCollection } from '../../mappers';
import { type ICollection } from '../../model';

export interface IFetchCollectionRequest {
  collectionId: ICollection['id'];
}

export const collectionFetchKey = 'fetchCollection' as const;

export default createFetchConfig(collectionFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/collections/:collectionId',
    method: 'GET',
  },
  getRequestOptions: ({ collectionId }: IFetchCollectionRequest) => ({
    params: { collectionId },
    mapper: mapperCollection,
  }),
  mockValue: collectionRaw,
});
