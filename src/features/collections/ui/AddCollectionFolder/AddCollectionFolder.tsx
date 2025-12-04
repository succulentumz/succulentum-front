import { type FC } from 'react';

import { CentredParagraph } from '@/features/helpers';
import { renderEmojiIcon } from '@/shared/ui';

import useStyles from './AddCollectionFolder.styles';

export interface IAddCollectionFolderProps {
  onClick: () => void;
}

export const AddCollectionFolder: FC<IAddCollectionFolderProps> = ({ onClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.addPlantFolder} title="Добавить папку" onClick={onClick}>
      <div className={classes.addPlantFolderIcon}>{renderEmojiIcon('addPlantFolder')}</div>
      <CentredParagraph>Добавить папку</CentredParagraph>
    </div>
  );
};
