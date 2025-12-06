import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { collectionsRaw } from '../../fixtures/collections';
import { mapperCollection } from '../../mappers';
import { type ICollectionRaw, type IPageable, pageableMax } from '../../model';

export interface IFetchCollectionsRequest {
  page?: IPageable;
}

export type IFetchCollectionsResponse = ICollectionRaw[];

export const collectionsFetchKey = 'fetchCollections' as const;

export default createFetchConfig(collectionsFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/me/collections',
    method: 'GET',
  },
  getRequestOptions: ({
    page = {
      pageNumber: 1,
      pageSize: pageableMax,
    },
  }: IFetchCollectionsRequest) => ({
    params: { ...page },
    mapper: (response: IFetchCollectionsResponse) => response.map(mapperCollection),
  }),
  mockValue: collectionsRaw,
});
