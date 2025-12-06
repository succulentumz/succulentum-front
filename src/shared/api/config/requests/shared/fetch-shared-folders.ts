import { type ICollection, type IFolderRaw, type IPageable, pageableMax } from '@/shared/api';
import { foldersRaw } from '@/shared/api/config/fixtures/folders';

import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { mapperFolder } from '../../mappers';

export interface IFetchSharedFoldersRequest {
  token: ICollection['sharedLink'];
  page?: IPageable;
}

export type IFetchSharedFoldersResponse = IFolderRaw[];

export const sharedFoldersFetchKey = 'fetchSharedFolders' as const;

export default createFetchConfig(sharedFoldersFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/shared/collections/:token/folders',
    method: 'GET',
  },
  getRequestOptions: ({
    page = {
      pageNumber: 1,
      pageSize: pageableMax,
    },
    token,
  }: IFetchSharedFoldersRequest) => ({
    params: { token, ...page },
    mapper: (response: IFetchSharedFoldersResponse) => response.map(mapperFolder),
  }),
  mockValue: foldersRaw,
});
