import { mapperPlant } from '../mappers';
import { IPlantLifeStatus, IPlantRaw } from '../model';

export const plantsRaw: IPlantRaw[] = [
  {
    id: 0,
    ownerId: 0,
    name: 'Plant 1',
    description: 'Plant',
    createdAt: '2022-08-09T09:08:51.494Z',
    collectionId: 0,
    lifeStatus: IPlantLifeStatus.ALIVE,
    updatedAt: '',
  },
  {
    id: 1,
    ownerId: 0,
    name: 'Plant 2',
    description: 'Plant',
    createdAt: '2023-01-09T09:08:51.494Z',
    collectionId: 0,
    lifeStatus: IPlantLifeStatus.ALIVE,
    updatedAt: '',
  },
  {
    id: 2,
    ownerId: 0,
    name: 'Plant 3',
    description: 'Plant',
    createdAt: '2023-10-09T09:08:51.494Z',
    collectionId: 0,
    lifeStatus: IPlantLifeStatus.ALIVE,
    updatedAt: '',
  },
  {
    id: 3,
    ownerId: 0,
    name: 'Plant 4',
    description: 'Plant',
    createdAt: '2024-04-19T09:08:51.494Z',
    collectionId: 0,
    lifeStatus: IPlantLifeStatus.ALIVE,
    updatedAt: '',
  },
  {
    id: 4,
    ownerId: 0,
    name: 'Plant 5',
    description: 'Plant',
    createdAt: '2025-02-28T09:08:51.494Z',
    collectionId: 0,
    lifeStatus: IPlantLifeStatus.ALIVE,
    updatedAt: '',
  },
];

export const plants = plantsRaw.map(mapperPlant);

export const plantRaw = plantsRaw[0];

export const plant = plants[0];
