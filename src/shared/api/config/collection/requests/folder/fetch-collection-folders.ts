import { hosts } from '../../../../../config';
import { createFetchConfig } from '../../../../helpers';
import { foldersRaw } from '../../fixtures/folders';
import { mapperFolder } from '../../mappers';
import { IFolderRaw, type ICollection } from '../../model';

export interface IFetchFolderRequest {
  collectionId: ICollection['id'];
}

export const collectionFoldersFetchKey = 'fetchCollectionFolders' as const;

export default createFetchConfig(collectionFoldersFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/folders/:collectionId',
    method: 'GET',
  },
  getRequestOptions: ({ collectionId }: IFetchFolderRequest) => ({
    params: { collectionId },
    mapper: (response: IFolderRaw[]) => response.map(mapperFolder),
  }),
  mockValue: foldersRaw,
});
