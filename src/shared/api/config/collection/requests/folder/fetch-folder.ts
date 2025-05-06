import { hosts } from '../../../../../config';
import { createFetchConfig } from '../../../../helpers';
import { folderRaw } from '../../fixtures/folders';
import { mapperFolder } from '../../mappers';
import { type ICollection } from '../../model';

export interface IFetchFolderRequest {
  collectionId: ICollection['id'];
}

export const folderFetchKey = 'fetchFolder' as const;

export default createFetchConfig(folderFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/folders/:collectionId',
    method: 'GET',
  },
  getRequestOptions: ({ collectionId }: IFetchFolderRequest) => ({
    params: { collectionId },
    mapper: mapperFolder,
  }),
  mockValue: folderRaw,
});
