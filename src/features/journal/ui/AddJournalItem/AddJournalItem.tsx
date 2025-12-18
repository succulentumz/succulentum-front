import { isNotEmpty } from '@true-engineering/true-react-platform-helpers';
import clsx from 'clsx';
import React, { type FC } from 'react';

import {
  CentredParagraph,
  CommonForm,
  PrettyInput,
  PrettySelect,
  PrettyTextArea,
} from '@/features/helpers';
import {
  type IJournalEntry,
  type IPlant,
  journalEntryCreateKey,
  journalEntryTypeValues,
  journalEntryTypeVocabulary,
} from '@/shared/api';

import useStyles from './AddJournalItem.styles';

export interface IAddJournalEntryItemProps {
  onClick: () => void;
  addItem: (entry: IJournalEntry) => void;
  focus: boolean;
  plantId: IPlant['id'];
}

export const AddJournalItem: FC<IAddJournalEntryItemProps> = ({
  onClick,
  addItem,
  focus,
  plantId,
}) => {
  const classes = useStyles();

  return (
    <div
      className={classes.addEntryItem}
      title="Добавить запись журнала"
      onClick={(e) => e.stopPropagation()}
    >
      {focus ? (
        <div className={clsx(classes.inner)}>
          <CommonForm
            key="form"
            commonKey={journalEntryCreateKey}
            defaultRequestData={{ title: '', description: '', plantId, noteType: 'WATERING' }}
            submitButtonText="Добавить запись"
            deleteRequestData={undefined}
            onCommonSubmit={(result) => isNotEmpty(result) && addItem(result)}
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
        </div>
      ) : (
        <div className={clsx(classes.innerCentred, classes.inner)} onClick={onClick}>
          <CentredParagraph>Добавить запись журнала</CentredParagraph>
        </div>
      )}
    </div>
  );
};
