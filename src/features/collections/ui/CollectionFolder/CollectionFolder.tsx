import { isEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC } from 'react';

import { CentredParagraph, RedactionButton } from '@/features/helpers';
import { type IFolder } from '@/shared/api';
import { renderEmojiIcon } from '@/shared/ui';

import useStyles from './CollectionFolder.styles';

export interface ICollectionFolderProps {
  folder: IFolder;
  onClick: (folderId: IFolder['id']) => void;
  redactionClick?: () => void;
}

export const CollectionFolder: FC<ICollectionFolderProps> = ({
  folder,
  onClick,
  redactionClick,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.collectionFolder}>
      {isEmpty(redactionClick) ? undefined : <RedactionButton onClick={redactionClick} />}
      <div
        className={classes.collectionFolderInner}
        title={folder.name}
        onClick={() => onClick(folder.id)}
      >
        <div className={classes.folderIcon}>{renderEmojiIcon('plantFolder')}</div>
        <CentredParagraph> {folder.name} </CentredParagraph>
      </div>
    </div>
  );
};
