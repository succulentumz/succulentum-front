import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { plantRaw } from '../../fixtures/plants';
import { mapperPlant } from '../../mappers';
import { type IPlant } from '../../model';

export interface IBuryPlantRequest {
  plantId: IPlant['id'];
}

export const plantBuryKey = 'buryPlant' as const;

export default createFetchConfig(plantBuryKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/plants/:plantId',
    method: 'POST',
  },
  getRequestOptions: ({ plantId }: IBuryPlantRequest) => ({
    params: { plantId },
    mapper: mapperPlant,
  }),
  mockValue: plantRaw,
});
