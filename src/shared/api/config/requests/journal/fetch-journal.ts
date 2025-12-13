import { hosts } from '../../../../config';
import { journalRaw } from '../../../config/fixtures/journal';
import { mapperJournalEntry } from '../../../config/mappers/journalEntry';
import { createFetchConfig } from '../../../helpers';
import { type IPageable, pageableMax, type IPlant, type IJournalEntryRaw } from '../../model';

export interface IFetchJournalRequest {
  page?: IPageable;
  plantId: IPlant['id'];
}

export type IFetchJournalResponse = IJournalEntryRaw[];

export const journalFetchKey = 'fetchJournal' as const;

export default createFetchConfig(journalFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/plants/:plantId/journal/entries',
    method: 'GET',
  },
  getRequestOptions: ({
    page = {
      pageNumber: 1,
      pageSize: pageableMax,
    },
    plantId,
  }: IFetchJournalRequest) => ({
    params: { ...page, plantId },
    mapper: (response: IFetchJournalResponse) => response.map(mapperJournalEntry),
  }),
  mockValue: journalRaw,
});
