import { isEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC } from 'react';

import { renderEmojiIcon } from '@/shared/ui';

import useStyles from './CreatePlant.styles';

export interface ICreatePlantProps {
}

export const CreatePlant: FC<ICreatePlantProps> = () => {
  const classes = useStyles();

  return (
    <div>
      HI!!!!
    </div>
  );
};
