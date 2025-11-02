import { type FC } from 'react';

import { renderEmojiIcon } from '@/shared/ui';

import useStyles from './AddPlantItem.styles';

export interface IAddPlantItemProps {
  onClick: () => void;
}

export const AddPlantItem: FC<IAddPlantItemProps> = ({ onClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.addPlantItem} title="Добавить растение" onClick={onClick}>
      <div className={classes.addPlantIcon}>{renderEmojiIcon('addPlantItem')}</div>
      Добавить растение
    </div>
  );
};
