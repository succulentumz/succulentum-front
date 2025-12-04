import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { plantsRaw } from '../../fixtures/plants';
import { mapperPlant } from '../../mappers';
import { type IPlantRaw, type IPageable } from '../../model';

export interface IPlantsRequest {
  page?: IPageable;
}

export type IFetchPlantsResponse = IPlantRaw[];

export const plantsFetchKey = 'fetchPlants' as const;

export default createFetchConfig(plantsFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/me/plants',
    method: 'GET',
  },
  getRequestOptions: ({
    page = {
      pageNumber: 0,
      pageSize: 0xffffffff,
    },
  }: IPlantsRequest) => ({
    params: { ...page },
    mapper: (response: IFetchPlantsResponse) => response.map(mapperPlant),
  }),
  mockValue: plantsRaw,
});
