import { hosts } from '../../../../../config';
import { createFetchConfig } from '../../../../helpers';
import { foldersRaw } from '../../fixtures/folders';
import { mapperFolder } from '../../mappers';
import { IFolderRaw } from '../../model';

export type IFetchFoldersResponse = IFolderRaw[];

export const foldersFetchKey = 'fetchFolders' as const;

export default createFetchConfig(foldersFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/folders',
    method: 'GET',
  },
  getRequestOptions: () => ({
    mapper: (response: IFetchFoldersResponse) => response.map(mapperFolder),
  }),
  mockValue: foldersRaw,
});
