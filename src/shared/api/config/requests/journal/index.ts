import createJournalEntry from './create-journal-entry';
import deleteJournal from './delete-journal-entry';
import editJournalEntry from './edit-journal-entry';
import fetchJournal from './fetch-journal';

export default {
  ...createJournalEntry,
  ...deleteJournal,
  ...editJournalEntry,
  ...fetchJournal,
};

export * from './create-journal-entry';
export * from './delete-journal-entry';
export * from './edit-journal-entry';
export * from './fetch-journal';
