import { hosts } from '../../../../config';
import { journalRaw } from '../../../config/fixtures/journal';
import { mapperJournalEntry } from '../../../config/mappers/journalEntry';
import { createFetchConfig } from '../../../helpers';
import { type IJournalEntry, type IJournalEntryRaw } from '../../model';

export interface IEditJournalEntryRequestParams {
  id: IJournalEntry['id'];
}

export type IEditJournalEntryRequestBody = Partial<
  Omit<IJournalEntryRaw, 'id' | 'createdAt' | 'plantId'>
>;

export type IEditJournalEntryRequest = IEditJournalEntryRequestParams &
  IEditJournalEntryRequestBody;

export const journalEntryEditKey = 'editJournalEntry' as const;

export default createFetchConfig(journalEntryEditKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/journal/entries/:entryId',
    method: 'PATCH',
  },
  getRequestOptions: ({ id, ...body }: IEditJournalEntryRequest) => ({
    params: { entryId: id },
    body,
    mapper: mapperJournalEntry,
  }),
  mockValue: journalRaw[0],
});
