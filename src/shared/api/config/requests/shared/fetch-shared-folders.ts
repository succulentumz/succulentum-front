import { type ICollection, type IFolderRaw } from '@/shared/api';
import { foldersRaw } from '@/shared/api/config/fixtures/folders';

import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { mapperFolder } from '../../mappers';

export interface IFetchSharedFoldersRequest {
  token: ICollection['sharedLink'];
}

export type IFetchSharedFoldersResponse = IFolderRaw[];

export const sharedFoldersFetchKey = 'fetchSharedFolders' as const;

export default createFetchConfig(sharedFoldersFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/shared/collections/:token/folders',
    method: 'GET',
  },
  getRequestOptions: ({ token }: IFetchSharedFoldersRequest) => ({
    params: { token },
    mapper: (response: IFetchSharedFoldersResponse) => response.map(mapperFolder),
  }),
  mockValue: foldersRaw,
});
