import { type FC } from 'react';

import { renderEmojiIcon } from '@/shared/ui';

import useStyles from './PlantModal.styles';
import { IPlant } from '@/shared/api';

export interface IPlantModalProps {
  plant: IPlant;
  redactionAllowed: boolean;
}

export const PlantModal: FC<IPlantModalProps> = ({ plant, redactionAllowed }) => {
  const classes = useStyles();

  return (
    <div>
      Модалка растения, да <br />
      (Ура, растение ура ура ура UwU ура {plant.name} привет! UwU)
    </div>
  );
};
