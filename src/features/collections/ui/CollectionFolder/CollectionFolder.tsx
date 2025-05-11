import { FC } from 'react';
import useStyles from './CollectionFolder.styles';
import { renderEmojiIcon } from '@/shared/ui';
import { IFolder } from '@/shared/api';

export interface ICollectionFolderProps {
  folderName: IFolder['name'];
  folderId: IFolder['id'];
  onClick: (folderId: IFolder['id']) => void;
}

export const CollectionFolder: FC<ICollectionFolderProps> = ({ folderName, folderId, onClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.collectionFolder} title={folderName} onClick={() => onClick(folderId)}>
      <div className={classes.folderIcon}>{renderEmojiIcon('plantFolder')}</div>
      {folderName}
    </div>
  );
};
