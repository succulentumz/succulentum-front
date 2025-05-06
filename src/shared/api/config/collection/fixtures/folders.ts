import { mapperFolder } from '../mappers';
import { IFolderRaw } from '../model';

export const foldersRaw: IFolderRaw[] = [
  {
    id: 0,
    collectionId: 0,
    name: 'Folder 1',
    createdAt: '2022-08-09T09:08:51.494Z',
  },
  {
    id: 1,
    collectionId: 0,
    name: 'Folder 2',
    createdAt: '2023-01-09T09:08:51.494Z',
  },
  {
    id: 2,
    collectionId: 0,
    name: 'Folder 3',
    createdAt: '2023-10-09T09:08:51.494Z',
  },
  {
    id: 3,
    collectionId: 0,
    name: 'Folder 4',
    createdAt: '2024-04-19T09:08:51.494Z',
  },
  {
    id: 4,
    collectionId: 0,
    name: 'Folder 5',
    createdAt: '2025-02-28T09:08:51.494Z',
  },
];

export const folders = foldersRaw.map(mapperFolder);

export const folderRaw = foldersRaw[0];

export const folder = folders[0];
