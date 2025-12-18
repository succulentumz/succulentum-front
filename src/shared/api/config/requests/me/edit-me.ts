import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { meRaw } from '../../fixtures/me';
import { mapperMe } from '../../mappers';
import { type IMe, type IMeRaw } from '../../model';

export interface IEditMeRequestParams {
  username?: IMe['username'];
  email?: IMe['email'];
}

export type IEditMeResponse = IMeRaw;

export const meEditKey = 'editMe' as const;

export default createFetchConfig(meEditKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/me',
    method: 'PATCH',
  },
  getRequestOptions: (body: IEditMeRequestParams) => ({
    body,
    mapper: mapperMe,
  }),
  mockValue: meRaw,
});
