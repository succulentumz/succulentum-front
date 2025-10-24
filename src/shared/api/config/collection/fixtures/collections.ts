import { mapperCollection } from '../mappers';
import { type ICollectionRaw } from '../model';

export const collectionsRaw: ICollectionRaw[] = [
  {
    id: 0,
    ownerId: 0,
    name: 'Collection 1',
    description: 'Collection',
    isShared: true,
    sharedLink: 'string',
    createdAt: '2022-08-09T09:08:51.494Z',
  },
  {
    id: 1,
    ownerId: 0,
    name: 'Collection 2',
    description: 'Collection',
    isShared: true,
    sharedLink: 'string',
    createdAt: '2023-01-09T09:08:51.494Z',
  },
  {
    id: 2,
    ownerId: 0,
    name: 'Collection 3',
    description: 'Collection',
    isShared: true,
    sharedLink: 'string',
    createdAt: '2023-10-09T09:08:51.494Z',
  },
  {
    id: 3,
    ownerId: 0,
    name: 'Collection 4',
    description: 'Collection',
    isShared: true,
    sharedLink: 'string',
    createdAt: '2024-04-19T09:08:51.494Z',
  },
  {
    id: 4,
    ownerId: 0,
    name: 'Collection 5',
    description: 'Collection',
    isShared: true,
    sharedLink: 'string',
    createdAt: '2025-02-28T09:08:51.494Z',
  },
];

export const collections = collectionsRaw.map(mapperCollection);

export const collectionRaw = collectionsRaw[0];

export const collection = collections[0];
