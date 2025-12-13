import { hosts } from '../../../../config';
import { journalRaw } from '../../../config/fixtures/journal';
import { mapperJournalEntry } from '../../../config/mappers/journalEntry';
import { createFetchConfig } from '../../../helpers';
import { type IJournalEntryRaw } from '../../model';

export type ICreateJournalEntryRequest = Omit<IJournalEntryRaw, 'entryId' | 'createdAt'>;

export const journalEntryCreateKey = 'createJournalEntry' as const;

export default createFetchConfig(journalEntryCreateKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/plants/:plantId/journal/entries',
    method: 'POST',
  },
  getRequestOptions: (body: ICreateJournalEntryRequest) => ({
    params: { plantId: body.plantId },
    body,
    mapper: mapperJournalEntry,
  }),
  mockValue: journalRaw[0],
});
