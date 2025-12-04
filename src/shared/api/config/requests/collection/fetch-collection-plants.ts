import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { plantsRaw } from '../../fixtures/plants';
import { mapperPlant } from '../../mappers';
import { type ICollection, type IPlantRaw } from '../../model';

export interface IFetchCollectionPlantsRequest {
  collectionId: ICollection['id'];
}

export type IFetchCollectionPlantsResponse = IPlantRaw[];

export const collectionPlantsFetchKey = 'fetchCollectionPlants' as const;

export default createFetchConfig(collectionPlantsFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/collections/:collectionId/plants',
    method: 'GET',
  },
  getRequestOptions: ({ collectionId }: IFetchCollectionPlantsRequest) => ({
    params: { collectionId },
    mapper: (response: IFetchCollectionPlantsResponse) => response.map(mapperPlant),
  }),
  mockValue: plantsRaw,
});
