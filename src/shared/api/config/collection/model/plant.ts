import { type ICollection } from './collection';
import { type IFolder } from './folder';

export interface IPlant<DateType = Date> {
  id: number;
  ownerId?: number;
  folderId?: IFolder['id'];
  collectionId: ICollection['id'];
  name: string;
  variety?: string;
  species?: string;
  description?: string;
  birthDate?: DateType;
  price?: number;
  location?: string;
  photoId?: string;
  lifeStatus: IPlantLifeStatus;
  deathLocation?: string;
  deathCause?: string;
  deathDate?: DateType;
  createdAt: DateType;
  updatedAt: DateType;
}

export type IPlantRaw = IPlant<string>;

export enum IPlantLifeStatus {
  ALIVE = 'ALIVE',
  DEAD = 'DEAD',
}
