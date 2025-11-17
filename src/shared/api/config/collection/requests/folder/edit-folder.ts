import { hosts } from '../../../../../config';
import { createFetchConfig } from '../../../../helpers';
import { folderRaw } from '../../fixtures/folders';
import { mapperFolder } from '../../mappers';
import { type ICollection, type IFolder } from '../../model';

export interface IEditFolderRequestParams {
  folderId: IFolder['id'];
}

export interface IEditFolderRequestBody {
  collectionId: ICollection['id'];
  name: IFolder['name'];
}

export type IEditFolderRequest = IEditFolderRequestParams & IEditFolderRequestBody;

export const folderEditKey = 'editFolder' as const;

export default createFetchConfig(folderEditKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/folders/:folderId',
    method: 'PATCH',
  },
  getRequestOptions: ({ folderId, ...body }: IEditFolderRequest) => ({
    params: { folderId },
    body,
    mapper: mapperFolder,
  }),
  mockValue: folderRaw,
});
