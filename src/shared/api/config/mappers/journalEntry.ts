import { parseISO } from 'date-fns';

import type { IJournalEntry, IJournalEntryRaw } from '@/shared/api';

export const mapperJournalEntry = (journalEntry: IJournalEntryRaw): IJournalEntry => ({
  ...journalEntry,
  createdAt: parseISO(journalEntry.createdAt),
});
