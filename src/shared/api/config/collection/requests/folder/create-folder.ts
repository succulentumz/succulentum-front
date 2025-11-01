import { hosts } from '../../../../../config';
import { createFetchConfig } from '../../../../helpers';
import { folderRaw } from '../../fixtures/folders';
import { mapperFolder } from '../../mappers';
import { type ICollection, type IFolder } from '../../model';

export type ICreateFolderRequest = Omit<IFolder, 'id' | 'createdAt'>;

export const folderCreateKey = 'createFolder' as const;

export default createFetchConfig(folderCreateKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/folders',
    method: 'POST',
  },
  getRequestOptions: (body: ICreateFolderRequest) => ({
    body,
    mapper: mapperFolder,
  }),
  mockValue: folderRaw,
});
