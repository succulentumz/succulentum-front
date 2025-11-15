import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { collectionRaw } from '../../fixtures/collections';
import { mapperCollection } from '../../mappers';
import { type ICollection } from '../../model';

export type ICreateCollectionRequest = Omit<ICollection, 'id' | 'createdAt'>;

export const collectionCreateKey = 'createCollection' as const;

export default createFetchConfig(collectionCreateKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/collections',
    method: 'POST',
  },
  getRequestOptions: (body: ICreateCollectionRequest) => ({
    body,
    mapper: mapperCollection,
  }),
  mockValue: collectionRaw,
});
