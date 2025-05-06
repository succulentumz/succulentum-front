import { hosts } from '../../../../../config';
import { createFetchConfig } from '../../../../helpers';
import { type IFolder } from '../../model';

export interface IDeleteFolderRequest {
  folderId: IFolder['id'];
}

export const folderDeleteKey = 'deleteFolder' as const;

export default createFetchConfig(folderDeleteKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/folders/:folderId',
    method: 'DELETE',
  },
  getRequestOptions: ({ folderId }: IDeleteFolderRequest) => ({
    params: { folderId },
    mapper: () => ({ status: 'OK' }),
  }),
});
