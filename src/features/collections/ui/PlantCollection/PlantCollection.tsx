import { type FC } from 'react';

import { type ICollection } from '@/shared/api';
import { renderEmojiIcon } from '@/shared/ui';

import useStyles from './PlantCollection.styles';
import { RedactionButton } from '@/features/helpers';

export interface ICollectionItemProps {
  collectionName: ICollection['name'];
  collectionDescription: ICollection['description'];
  collectionId: ICollection['id'];
  onClick: (collectionId: ICollection['id']) => void;
  redactionClick: () => void;
}

// small square style
// export const PlantCollection: FC<ICollectionItemProps> = ({
//   collectionName,
//   collectionId,
//   onClick,
// }) => {
//   const classes = useStyles();
//
//   return (
//     <div
//       className={classes.plantCollection}
//       title={collectionName}
//       onClick={() => onClick(collectionId)}
//     >
//       <div className={classes.collectionIcon}>{renderEmojiIcon('plantCollection')}</div>
//       {collectionName}
//     </div>
//   );
// };

export const PlantCollection: FC<ICollectionItemProps> = ({
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
