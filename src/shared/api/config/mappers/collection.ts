import { parseISO } from 'date-fns';

import { type ICollection, type ICollectionRaw } from '../model';

export const mapperCollection = (collection: ICollectionRaw): ICollection => ({
  ...collection,
  createdAt: parseISO(collection.createdAt),
});
