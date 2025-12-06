import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { foldersRaw } from '../../fixtures/folders';
import { mapperFolder } from '../../mappers';
import { type IFolderRaw, type ICollection, type IPageable, pageableMax } from '../../model';

export interface IFetchFolderRequest {
  page?: IPageable;
  collectionId: ICollection['id'];
}

export const collectionFoldersFetchKey = 'fetchCollectionFolders' as const;

export default createFetchConfig(collectionFoldersFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/collections/:collectionId/folders',
    method: 'GET',
  },
  getRequestOptions: ({
    page = {
      pageNumber: 1,
      pageSize: pageableMax,
    },
    collectionId,
  }: IFetchFolderRequest) => ({
    params: { collectionId, ...page },
    mapper: (response: IFolderRaw[]) => response.map(mapperFolder),
  }),
  mockValue: foldersRaw,
});
