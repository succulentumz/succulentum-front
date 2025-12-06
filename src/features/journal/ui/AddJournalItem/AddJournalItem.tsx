import { type FC } from 'react';

import { CentredParagraph } from '@/features/helpers';
import { renderEmojiIcon } from '@/shared/ui';

import useStyles from './AddJournalItem.styles';

export interface IAddJournalEntryItemProps {
  onClick: () => void;
}

export const AddJournalItem: FC<IAddJournalEntryItemProps> = ({ onClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.addPlantItem} title="Добавить запись журнала" onClick={onClick}>
      <div className={classes.addPlantIcon}>{renderEmojiIcon('addPlantItem')}</div>
      <CentredParagraph>Добавить растение</CentredParagraph>
    </div>
  );
};
