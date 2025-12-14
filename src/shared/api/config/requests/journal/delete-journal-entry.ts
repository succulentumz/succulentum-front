import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { type IJournalEntry } from '../../model';

export interface IDeleteJournalRequest {
  id: IJournalEntry['id'];
}

export const journalDeleteKey = 'deleteJournalEntry' as const;

export default createFetchConfig(journalDeleteKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/journal/:entryId/delete',
    method: 'DELETE',
  },
  getRequestOptions: ({ id }: IDeleteJournalRequest) => ({
    params: { entryId: id },
    mapper: () => ({ status: 'OK' }),
  }),
  mockValue: { status: 'OK' },
});
