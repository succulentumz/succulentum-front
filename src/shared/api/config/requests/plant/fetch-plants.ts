import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { plantsRaw } from '../../fixtures/plants';
import { mapperPlant } from '../../mappers';
import { type ICollection, type IPlantRaw } from '../../model';

export interface IFetchPlantsRequest {
  collectionId: ICollection['id'];
}

export type IFetchPlantsResponse = IPlantRaw[];

export const plantsFetchKey = 'fetchPlants' as const;

export default createFetchConfig(plantsFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/collections/:collectionId/plants',
    method: 'GET',
  },
  getRequestOptions: ({ collectionId }: IFetchPlantsRequest) => ({
    params: { collectionId },
    mapper: (response: IFetchPlantsResponse) => response.map(mapperPlant),
  }),
  mockValue: plantsRaw,
});
