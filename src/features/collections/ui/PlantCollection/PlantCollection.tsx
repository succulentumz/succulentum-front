import { isEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC } from 'react';

import { RedactionButton } from '@/features/helpers';
import { type ICollection } from '@/shared/api';
import { renderEmojiIcon } from '@/shared/ui';

import useStyles from './PlantCollection.styles';

export interface ICollectionItemProps {
  collection: ICollection;
  onClick: (collectionId: ICollection['id']) => void;
  redactionClick?: () => void;
}

// small square style
export const PlantCollection: FC<ICollectionItemProps> = ({
  collection,
  onClick,
  redactionClick,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.plantCollection} onClick={() => onClick(collection.id)}>
      {isEmpty(redactionClick) ? undefined : <RedactionButton onClick={redactionClick} />}
      <div className={classes.plantCollectionInner} title={collection.name}>
        <div className={classes.collectionIcon}>{renderEmojiIcon('plantCollection')}</div>
        {collection.name}
      </div>
    </div>
  );
};

// wide rectangle style
export const PlantCollection1: FC<ICollectionItemProps> = ({
  collection,
  onClick,
  redactionClick,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.plantCollection1}>
      {isEmpty(redactionClick) ? undefined : <RedactionButton onClick={redactionClick} />}
      <div
        className={classes.plantCollectionInner1}
        title={collection.name}
        onClick={() => onClick(collection.id)}
      >
        <div className={classes.collectionIcon1}>{renderEmojiIcon('plantCollection')}</div>
        <div>
          <b>{collection.id}</b>
          <br />
          {collection.description}
        </div>
      </div>
    </div>
  );
};
