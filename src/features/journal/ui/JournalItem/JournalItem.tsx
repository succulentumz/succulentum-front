import { isEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC } from 'react';

import { CentredParagraph } from '@/features/helpers';
import { IJournalEntry } from '@/shared/api';
import { renderEmojiIcon } from '@/shared/ui';

import useStyles from './JournalItem.styles';

export interface IPlantItemProps {
  entry: IJournalEntry;
  redaction?: (plantId: IJournalEntry['entryId']) => void;
}

export const JournalItem: FC<IPlantItemProps> = ({ entry, redaction }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.plantItem}
      title={entry.title}
      onClick={() => redaction?.(entry.entryId)}
    >
      <div className={classes.plantIcon}>
        {renderEmojiIcon('plantItem')}
      </div>
      <CentredParagraph>{entry.title}</CentredParagraph>
    </div>
  );
};
