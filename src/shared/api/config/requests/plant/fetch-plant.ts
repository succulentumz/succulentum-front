import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { plantsRaw } from '../../fixtures/plants';
import { mapperPlant } from '../../mappers';
import { type IPlant } from '../../model';

export interface IFetchPlantRequest {
  plantId: IPlant['id'];
}

export const plantFetchKey = 'fetchPlant' as const;

export default createFetchConfig(plantFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/plants/{plantId}',
    method: 'GET',
  },
  getRequestOptions: ({ plantId }: IFetchPlantRequest) => ({
    params: { plantId },
    mapper: mapperPlant,
  }),
  mockValue: plantsRaw[0],
});
