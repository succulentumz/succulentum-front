import { isEmpty, isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import React, { type FC } from 'react';

import { CommonForm, PrettyInput, PrettySelect, PrettyTextArea, RedactionButton } from '@/features/helpers';
import {
  type IJournalEntry,
  journalDeleteKey,
  journalEntryEditKey, journalEntryTypeValues,
  journalEntryTypeVocabulary,
} from '@/shared/api';

import useStyles from './JournalItem.styles';

export type ManageEntryMode = 'read' | 'redaction';

export interface ManageEntry {
  id: IJournalEntry['id'];
  mode: ManageEntryMode;
}

export interface IJournalItemProps {
  entry: IJournalEntry;
  mode: ManageEntryMode | undefined;
  imClicked: (manageEntry: ManageEntry) => void;
  redactionAllowed: boolean;
  deleteMe: () => void;
  updateMe: (entry: IJournalEntry) => void;
}

export const JournalItem: FC<IJournalItemProps> = ({
  entry,
  mode,
  imClicked,
  redactionAllowed,
  deleteMe,
  updateMe,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.entry} onClick={(e) => e.stopPropagation()}>
      {redactionAllowed && mode !== 'redaction' && (
        <RedactionButton
          key="redact"
          onClick={() => imClicked({ id: entry.id, mode: 'redaction' })}
          style={{ zIndex: 1 }}
        />
      )}
      <div
        className={classes.entryInner}
        onClick={(event) => {
          event.stopPropagation();
          if (isEmpty(mode)) {
            imClicked({ id: entry.id, mode: 'read' });
          }
        }}
      >
        <div className={classes.content}>
          {mode === 'redaction' ? (
            <CommonForm
              key="form"
              commonKey={journalEntryEditKey}
              deleteKey={journalDeleteKey}
              defaultRequestData={entry}
              deleteRequestData={entry}
              submitButtonText="Изменить"
              onCommonSubmit={(newEntry) => isNotEmpty(newEntry) && updateMe(newEntry)}
              onDeleteSubmit={(isError) => !isError && deleteMe()}
            >
              {(handler, form) => (
                <>
                  <PrettyInput
                    key="title"
                    type="text"
                    value={form.title}
                    onChange={handler}
                    autoComplete="off"
                    name="title"
                  />
                  <PrettyTextArea
                    key="description"
                    value={form.description}
                    onChange={handler}
                    autoComplete="off"
                    name="description"
                  />
                  <PrettySelect
                    key="noteType"
                    value={form.noteType}
                    onChange={handler}
                    name="noteType"
                  >
                    {journalEntryTypeValues.map((e) => ({
                      children: journalEntryTypeVocabulary.get(e),
                      value: e,
                    }))}
                  </PrettySelect>
                </>
              )}
            </CommonForm>
          ) : (
            <>
              <div>
                <b>{entry.title}</b>
              </div>
              {mode === 'read' ? (
                <PrettyTextArea disabled={true} value={entry.description} />
              ) : (
                <div className={classes.truncateBlur}>{entry.description}</div>
              )}
              <i>{journalEntryTypeVocabulary.get(entry.noteType)}</i>
            </>
          )}
          <div className={classes.date}>{entry.createdAt.toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};
