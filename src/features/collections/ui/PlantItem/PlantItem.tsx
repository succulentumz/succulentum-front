import { isEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC } from 'react';

import { CentredParagraph } from '@/features/helpers';
import { type IPlant } from '@/shared/api';
import { renderEmojiIcon } from '@/shared/ui';

import useStyles from './PlantItem.styles';

export interface IPlantItemProps {
  plant: IPlant;
  onClick: (plantId: IPlant['id']) => void;
}

export const PlantItem: FC<IPlantItemProps> = ({ plant, onClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.plantItem} title={plant.name} onClick={() => onClick(plant.id)}>
      <div className={classes.plantIcon}>
        {isEmpty(plant.avatarId) ? renderEmojiIcon('plantItem') : plant.avatarId}
      </div>
      <CentredParagraph>{plant.name}</CentredParagraph>
    </div>
  );
};
