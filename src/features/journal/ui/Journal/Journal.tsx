import { isEmpty, isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import { type FC, Fragment, useCallback, useState } from 'react';

import { useApiQuery, type IPlant, journalFetchKey, type IJournalEntry } from '@/shared/api';
import { addToaster } from '@/shared/global';
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

  const manageEntries = useCallback((newEntries: IJournalEntry[] | undefined) => {
    setEntries(newEntries);
  }, []);

  const manageUsingEntry = useCallback((manageEntry: ManageEntry) => {
    setUsingEntry(manageEntry);
  }, []);

  const fetchJournal = useApiQuery(journalFetchKey, { plantId }, { enabled: true });

  if (isEmpty(entries) && isNotEmpty(fetchJournal.data)) {
    manageEntries(fetchJournal.data.reverse());
  }

  const isLoading = fetchJournal.isLoading;

  const lostFocus = () => manageUsingEntry({ id: -2, mode: 'read' });

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
                onClick={() => manageUsingEntry({ id: -1, mode: 'read' })}
                key="addJournal"
                addItem={(newEntry) => {
                  entries?.splice(0, 0, newEntry);
                  manageEntries(entries);
                  lostFocus();
                }}
                focus={usingEntry.id === -1}
                plantId={plantId}
              />
            )}
            {entries?.map((entry, index) => (
              <JournalItem
                key={`${entry.entryId}`}
                entry={entry}
                mode={entry.entryId === usingEntry.id ? usingEntry.mode : undefined}
                imClicked={manageUsingEntry}
                redactionAllowed={redactionAllowed}
                deleteMe={() => {
                  entries?.splice(index, 1);
                  manageEntries(entries);
                  lostFocus();
                }}
                updateMe={(newEntry) => {
                  entries[index] = newEntry;
                  manageEntries(entries);
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
