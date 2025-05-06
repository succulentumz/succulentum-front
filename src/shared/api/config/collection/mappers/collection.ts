import { parseISO } from 'date-fns';
import { ICollection, ICollectionRaw } from '../model';

export const mapperCollection = (collection: ICollectionRaw): ICollection => ({
  ...collection,
  createdAt: parseISO(collection.createdAt),
});
