import { isEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC } from 'react';

import { renderEmojiIcon } from '@/shared/ui';

import useStyles from './CreateCollectionFolder.styles';

export interface ICreateCollectionFolderProps {
}

export const CreateCollectionFolder: FC<ICreateCollectionFolderProps> = () => {
  const classes = useStyles();

  return (
    <div>
      HI!!!!
    </div>
  );
};
