import { parseISO } from 'date-fns';

import { type IFolder, type IFolderRaw } from '../model';

export const mapperFolder = (folder: IFolderRaw): IFolder => ({
  ...folder,
  createdAt: parseISO(folder.createdAt),
});
