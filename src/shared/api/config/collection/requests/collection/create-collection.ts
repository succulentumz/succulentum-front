import { hosts } from '../../../../../config';
import { createFetchConfig } from '../../../../helpers';
import { collectionRaw } from '../../fixtures/collections';
import { mapperCollection } from '../../mappers';
import { ICollection } from '../../model';

export interface ICreateCollectionRequest {
  ownerId: ICollection['ownerId'];
  name: ICollection['name'];
  description?: ICollection['description'];
  isShared: ICollection['isShared'];
  sharedLink?: ICollection['sharedLink'];
}

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
