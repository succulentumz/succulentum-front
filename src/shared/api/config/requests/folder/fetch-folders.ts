import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { foldersRaw } from '../../fixtures/folders';
import { mapperFolder } from '../../mappers';
import { type IFolderRaw, type IPageable, pageableMax } from '../../model';

export interface IFetchFoldersRequest {
  page?: IPageable;
}

export type IFetchFoldersResponse = IFolderRaw[];

export const foldersFetchKey = 'fetchFolders' as const;

export default createFetchConfig(foldersFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/folders',
    method: 'GET',
  },
  getRequestOptions: ({
    page = {
      pageNumber: 1,
      pageSize: pageableMax,
    },
  }: IFetchFoldersRequest) => ({
    params: { ...page },
    mapper: (response: IFetchFoldersResponse) => response.map(mapperFolder),
  }),
  mockValue: foldersRaw,
});
