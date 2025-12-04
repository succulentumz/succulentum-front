import { mapperCollection } from '../mappers';
import { type ICollectionRaw } from '../model';

export const collectionsRaw: ICollectionRaw[] = [
  {
    id: 0,
    ownerId: 0,
    name: 'Collection 1',
    description: 'Описание коллекции ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 1234567890 so many letters omg',
    isShared: true,
    sharedLink: 'ABCD0001',
    createdAt: '2022-08-09T09:08:51.494Z',
  },
  {
    id: 1,
    ownerId: 0,
    name: 'Collection 2',
    description: 'Описание коллекции ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 1234567890 so many letters omg',
    isShared: true,
    sharedLink: 'ABCD0002',
    createdAt: '2023-01-09T09:08:51.494Z',
  },
  {
    id: 2,
    ownerId: 0,
    name: 'Collection 3',
    description: 'Описание коллекции',
    isShared: true,
    sharedLink: 'ABCD0003',
    createdAt: '2023-10-09T09:08:51.494Z',
  },
];

export const collections = collectionsRaw.map(mapperCollection);

export const collectionRaw = collectionsRaw[0];

export const collection = collections[0];
