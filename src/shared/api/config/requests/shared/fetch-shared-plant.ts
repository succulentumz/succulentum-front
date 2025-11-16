import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { plantsRaw } from '../../fixtures/plants';
import { mapperPlant } from '../../mappers';
import { type ICollection, type IPlant } from '../../model';

export interface IFetchStaredPlantRequest {
  token: ICollection['sharedLink'];
  plantId: IPlant['id'];
}

export const sharedPlantFetchKey = 'fetchSharedPlant' as const;

export default createFetchConfig(sharedPlantFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/shared/collections/{token}/plants/{plantId}',
    method: 'GET',
  },
  getRequestOptions: ({ token, plantId }: IFetchStaredPlantRequest) => ({
    params: { token, plantId },
    mapper: mapperPlant,
  }),
  mockValue: plantsRaw[0],
});
