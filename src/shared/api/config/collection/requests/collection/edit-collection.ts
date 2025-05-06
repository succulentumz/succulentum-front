import { hosts } from '../../../../../config';
import { createFetchConfig } from '../../../../helpers';
import { collectionRaw } from '../../fixtures/collections';
import { mapperCollection } from '../../mappers';
import { type ICollection } from '../../model';

export interface IEditCollectionRequestParams {
  collectionId: ICollection['id'];
}

export interface IEditCollectionRequestBody {
  name?: ICollection['name'];
  description?: ICollection['description'];
  isShared?: ICollection['isShared'];
  createdAt?: ICollection['createdAt'];
}

export type IEditCollectionRequest = IEditCollectionRequestParams & IEditCollectionRequestBody;

export const collectionEditKey = 'editCollection' as const;

export default createFetchConfig(collectionEditKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/collections/:collectionId',
    method: 'PATCH',
  },
  getRequestOptions: ({ collectionId, ...body }: IEditCollectionRequest) => ({
    params: { collectionId },
    body,
    mapper: mapperCollection,
  }),
  mockValue: collectionRaw,
});
