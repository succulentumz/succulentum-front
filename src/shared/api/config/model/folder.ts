import { type ICollection } from './collection';

export interface IFolder<DateType = Date> {
  id: number;
  collectionId: ICollection['id'];
  name: string;
  createdAt: DateType;
}

export type IFolderRaw = IFolder<string>;
