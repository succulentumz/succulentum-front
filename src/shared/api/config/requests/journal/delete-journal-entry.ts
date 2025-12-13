import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { type IJournalEntry } from '../../model';

export interface IDeleteJournalRequest {
  entryId: IJournalEntry['entryId'];
}

export const journalDeleteKey = 'deleteJournalEntry' as const;

export default createFetchConfig(journalDeleteKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/journal/:entryId/delete',
    method: 'DELETE',
  },
  getRequestOptions: ({ entryId }: IDeleteJournalRequest) => ({
    params: { entryId },
    mapper: () => ({ status: 'OK' }),
  }),
  mockValue: { status: 'OK' },
});
