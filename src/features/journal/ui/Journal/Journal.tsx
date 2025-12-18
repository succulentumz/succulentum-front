import { isEmpty, isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC, Fragment, useState } from 'react';

import { useApiQuery, type IPlant, journalFetchKey, type IJournalEntry } from '@/shared/api';
import { Loader, Splash } from '@/shared/ui';

import { AddJournalItem } from '../AddJournalItem';
import { JournalItem, type ManageEntry } from '../JournalItem';

import useStyles from './Journal.styles';

export interface IJournalProps {
  plantId: IPlant['id'];
  redactionAllowed: boolean;
}

export const JournalId = 'Journal';

export const Journal: FC<IJournalProps> = ({ plantId, redactionAllowed }) => {
  const classes = useStyles();

  const [usingEntry, setUsingEntry] = useState<ManageEntry>({ id: -2, mode: 'read' });
  const [entries, setEntries] = useState<IJournalEntry[] | undefined>(undefined);

  const fetchJournal = useApiQuery(journalFetchKey, { plantId }, { enabled: true });

  if (isEmpty(entries) && isNotEmpty(fetchJournal.data)) {
    setEntries(fetchJournal.data);
  }

  const isLoading = fetchJournal.isLoading;

  const lostFocus = () => setUsingEntry({ id: -2, mode: 'read' });

  return (
    <div id={JournalId} className={classes.journal} onClick={lostFocus}>
      {isLoading ? (
        <Loader />
      ) : isEmpty(entries) ? (
        <Splash icon="eyes">Журнал не найден!</Splash>
      ) : (
        <div className={classes.content}>
          <Fragment>
            {redactionAllowed && (
              <AddJournalItem
                onClick={() => setUsingEntry({ id: -1, mode: 'read' })}
                key="addJournal"
                addItem={(newEntry) => {
                  entries?.splice(0, 0, newEntry);
                  setEntries(entries);
                  lostFocus();
                }}
                focus={usingEntry.id === -1}
                plantId={plantId}
              />
            )}
            {entries?.map((entry, index) => (
              <JournalItem
                key={`${entry.id}`}
                entry={entry}
                mode={entry.id === usingEntry.id ? usingEntry.mode : undefined}
                imClicked={setUsingEntry}
                redactionAllowed={redactionAllowed}
                deleteMe={() => {
                  entries?.splice(index, 1);
                  setEntries(entries);
                  lostFocus();
                }}
                updateMe={(newEntry) => {
                  entries[index] = newEntry;
                  setEntries(entries);
                  lostFocus();
                }}
              />
            ))}
          </Fragment>
        </div>
      )}
    </div>
  );
};
