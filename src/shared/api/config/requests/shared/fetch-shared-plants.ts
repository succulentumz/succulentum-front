import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { plantsRaw } from '../../fixtures/plants';
import { mapperPlant } from '../../mappers';
import { type ICollection, type IPlantRaw } from '../../model';

export interface IFetchSharedPlantsRequest {
  token: ICollection['sharedLink'];
}

export type IFetchSharedPlantsResponse = IPlantRaw[];

export const sharedPlantsFetchKey = 'fetchSharedPlants' as const;

export default createFetchConfig(sharedPlantsFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/shared/collections/:token/plants',
    method: 'GET',
  },
  getRequestOptions: ({ token }: IFetchSharedPlantsRequest) => ({
    params: { token },
    mapper: (response: IFetchSharedPlantsResponse) => response.map(mapperPlant),
  }),
  mockValue: plantsRaw,
});
