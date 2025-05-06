import { parseISO } from 'date-fns';
import { IFolder, IFolderRaw } from '../model';

export const mapperFolder = (folder: IFolderRaw): IFolder => ({
  ...folder,
  createdAt: parseISO(folder.createdAt),
});
