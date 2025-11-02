import { type FC } from 'react';

import { renderEmojiIcon } from '@/shared/ui';

import useStyles from './AddPlantCollection.styles';

export interface IAddPlantCollectionProps {
  onClick: () => void;
}

export const AddPlantCollection: FC<IAddPlantCollectionProps> = ({ onClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.addPlantCollection} title="Добавить коллекцию" onClick={onClick}>
      <div className={classes.addPlantCollectionIcon}>{renderEmojiIcon('addPlantCollection')}</div>
      Добавить коллекцию
    </div>
  );
};
