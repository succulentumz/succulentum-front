import { mapperFolder } from '../mappers';
import { IFolderRaw } from '../model';

export const foldersRaw: IFolderRaw[] = [
  {
    id: 0,
    collectionId: 0,
    name: 'Кактусовые',
    createdAt: '2022-08-09T09:08:51.494Z',
  },
  {
    id: 1,
    collectionId: 0,
    name: 'Замиокулькас',
    createdAt: '2023-01-09T09:08:51.494Z',
  },
  {
    id: 2,
    collectionId: 0,
    name: 'Пеперомия',
    createdAt: '2023-10-09T09:08:51.494Z',
  },
  {
    id: 3,
    collectionId: 0,
    name: 'Бегония',
    createdAt: '2024-04-19T09:08:51.494Z',
  },
  {
    id: 4,
    collectionId: 0,
    name: 'Толстянковые',
    createdAt: '2025-02-28T09:08:51.494Z',
  },
];

export const folders = foldersRaw.map(mapperFolder);

export const folderRaw = foldersRaw[0];

export const folder = folders[0];
