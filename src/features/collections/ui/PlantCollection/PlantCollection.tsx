import { type FC } from 'react';

import { type ICollection } from '@/shared/api';
import { renderEmojiIcon } from '@/shared/ui';

import useStyles from './CollectionItem.styles';

export interface ICollectionItemProps {
  collectionName: ICollection['name'];
  collectionId: ICollection['id'];
  onClick: (folderId: ICollection['id']) => void;
}

export const PlantCollection: FC<ICollectionItemProps> = ({
  collectionName,
  collectionId,
  onClick,
}) => {
  const classes = useStyles();

  return (
    <div
      className={classes.plantCollection}
      title={collectionName}
      onClick={() => onClick(collectionId)}
    >
      <div className={classes.folderIcon}>{renderEmojiIcon('plantCollection')}</div>
      {collectionName}
    </div>
  );
};
