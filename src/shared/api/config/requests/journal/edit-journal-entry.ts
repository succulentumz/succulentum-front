import { type Nullable } from '@/shared/model';

import { hosts } from '../../../../config';
import { journalRaw } from '../../../config/fixtures/journal';
import { mapperJournalEntry } from '../../../config/mappers/journalEntry';
import { createFetchConfig } from '../../../helpers';
import { type IJournalEntry, type IJournalEntryRaw } from '../../model';

export interface IEditJournalEntryRequestParams {
  entryId: IJournalEntry['entryId'];
}

export type IEditJournalEntryRequestBody = Nullable<
  Omit<IJournalEntryRaw, 'entryId' | 'createdAt'>
>;

export type IEditJournalEntryRequest = IEditJournalEntryRequestParams &
  IEditJournalEntryRequestBody;

export const journalEntryEditKey = 'editJournalEntry' as const;

export default createFetchConfig(journalEntryEditKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/plants/:plantId/journal/entries',
    method: 'PATCH',
  },
  getRequestOptions: ({ entryId, ...body }: IEditJournalEntryRequest) => ({
    params: { entryId, ...body },
    mapper: mapperJournalEntry,
  }),
  mockValue: journalRaw[0],
});
