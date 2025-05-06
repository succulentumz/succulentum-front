import fetchFolder from './fetch-folder';
import fetchFolders from './fetch-folders';
import createFolder from './create-folder';
import deleteFolder from './delete-folder';
import editFolder from './edit-folder';

export default {
  ...createFolder,
  ...deleteFolder,
  ...editFolder,
  ...fetchFolder,
  ...fetchFolders,
};

export * from './create-folder';
export * from './delete-folder';
export * from './edit-folder';
export * from './fetch-folder';
export * from './fetch-folders';
