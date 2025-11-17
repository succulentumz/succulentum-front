import { hosts } from '../../../../../config';
import { createFetchConfig } from '../../../../helpers';
import { plantRaw } from '../../fixtures/plants';
import { mapperPlant } from '../../mappers';
import { type IPlant } from '../../model';

export type ICreatePlantRequest = Omit<IPlant, 'id' | 'createdAt' | 'updatedAt'>;

export const plantCreateKey = 'createPlant' as const;

export default createFetchConfig(plantCreateKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/plants',
    method: 'POST',
  },
  getRequestOptions: (body: ICreatePlantRequest) => ({
    body,
    mapper: mapperPlant,
  }),
  mockValue: plantRaw,
});
