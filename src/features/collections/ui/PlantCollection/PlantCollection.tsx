import { type FC } from 'react';

import { CentredParagraph, RedactionButton } from '@/features/helpers';
import { type ICollection } from '@/shared/api';
import { renderEmojiIcon } from '@/shared/ui';

import useStyles from './PlantCollection.styles';

export interface ICollectionItemProps {
  collectionName: ICollection['name'];
  collectionDescription: ICollection['description'];
  collectionId: ICollection['id'];
  onClick: (collectionId: ICollection['id']) => void;
  redactionClick: () => void;
}

// small square style
export const PlantCollection: FC<ICollectionItemProps> = ({
  collectionName,
  collectionId,
  onClick,
  redactionClick,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.plantCollection}>
      <RedactionButton onClick={redactionClick} />
      <div
        className={classes.plantCollectionInner}
        title={collectionName}
        onClick={() => onClick(collectionId)}
      >
        <div className={classes.collectionIcon}>{renderEmojiIcon('plantCollection')}</div>
        <CentredParagraph>{collectionName}</CentredParagraph>
      </div>
    </div>
  );
};

// wide rectangle style
export const PlantCollection1: FC<ICollectionItemProps> = ({
  collectionName,
  collectionId,
  onClick,
  collectionDescription,
  redactionClick,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.plantCollection1}>
      <RedactionButton onClick={redactionClick} />
      <div
        className={classes.plantCollectionInner1}
        title={collectionName}
        onClick={() => onClick(collectionId)}
      >
        <div className={classes.collectionIcon1}>{renderEmojiIcon('plantCollection')}</div>
        <div>
          <b>{collectionName}</b>
          <br />
          {collectionDescription}
        </div>
      </div>
    </div>
  );
};
