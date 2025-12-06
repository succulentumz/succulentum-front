import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { plantsRaw } from '../../fixtures/plants';
import { mapperPlant } from '../../mappers';
import { type ICollection, type IPageable, type IPlantRaw, pageableMax } from '../../model';

export interface IFetchSharedPlantsRequest {
  token: ICollection['sharedLink'];
  page?: IPageable;
}

export type IFetchSharedPlantsResponse = IPlantRaw[];

export const sharedPlantsFetchKey = 'fetchSharedPlants' as const;

export default createFetchConfig(sharedPlantsFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/shared/collections/:token/plants',
    method: 'GET',
  },
  getRequestOptions: ({
    page = {
      pageNumber: 1,
      pageSize: pageableMax,
    },
    token,
  }: IFetchSharedPlantsRequest) => ({
    params: { token, ...page },
    mapper: (response: IFetchSharedPlantsResponse) => response.map(mapperPlant),
  }),
  mockValue: plantsRaw,
});
