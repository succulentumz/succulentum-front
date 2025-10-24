import createFolder from './create-folder';
import deleteFolder from './delete-folder';
import editFolder from './edit-folder';
import fetchCollectionFolders from './fetch-collection-folders';
import fetchFolders from './fetch-folders';

export default {
  ...createFolder,
  ...deleteFolder,
  ...editFolder,
  ...fetchCollectionFolders,
  ...fetchFolders,
};

export * from './create-folder';
export * from './delete-folder';
export * from './edit-folder';
export * from './fetch-collection-folders';
export * from './fetch-folders';
