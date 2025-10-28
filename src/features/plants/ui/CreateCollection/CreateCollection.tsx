import { isEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC } from 'react';

import { renderEmojiIcon } from '@/shared/ui';

import useStyles from './CreateCollection.styles';

export interface ICreateCollectionProps {
}

export const CreateCollection: FC<ICreateCollectionProps> = () => {
  const classes = useStyles();

  return (
    <div>
      HI!!!!
    </div>
  );
};
