import { IPlant } from '@/shared/api';
import { FC } from 'react';

import useStyles from './PlantItem.styles';
import { renderEmojiIcon } from '@/shared/ui';
import { isEmpty } from '@true-engineering/true-react-platform-helpers';

export interface IPlantItemProps {
  plantName: IPlant['name'];
  plantId: IPlant['id'];
  plantPhotoId: IPlant['photoId'];
  onClick: (plantId: IPlant['id']) => void;
}

export const PlantItem: FC<IPlantItemProps> = ({ plantName, plantId, plantPhotoId, onClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.plantItem} title={plantName} onClick={() => onClick(plantId)}>
      <div className={classes.plantIcon}>
        {isEmpty(plantPhotoId) ? renderEmojiIcon('plantItem') : plantPhotoId}
      </div>
      {plantName}
    </div>
  );
};
