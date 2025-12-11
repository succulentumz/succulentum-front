import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { plantsRaw } from '../../fixtures/plants';
import { mapperPlant } from '../../mappers';
import { type ICollection, type IPageable, type IPlantRaw, pageableMax } from '../../model';

export interface IFetchCollectionPlantsRequest {
  collectionId: ICollection['id'];
  page?: IPageable;
}

export type IFetchCollectionPlantsResponse = IPlantRaw[];

export const collectionPlantsFetchKey = 'fetchCollectionPlants' as const;

export default createFetchConfig(collectionPlantsFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/collections/:collectionId/plants',
    method: 'GET',
  },
  getRequestOptions: ({
    page = {
      pageNumber: 1,
      pageSize: pageableMax,
    },
    collectionId,
  }: IFetchCollectionPlantsRequest) => ({
    params: { collectionId, ...page },
    mapper: (response: IFetchCollectionPlantsResponse) => response.map(mapperPlant),
  }),
  mockValue: plantsRaw,
});
