import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { plantsRaw } from '../../fixtures/plants';
import { mapperPlant } from '../../mappers';
import { type IPlantRaw, type IPageable } from '../../model';

export interface IBuriedPlantsRequest {
  page?: IPageable;
}

export type IFetchPlantsBuriedResponse = IPlantRaw[];

export const plantsBuriedFetchKey = 'fetchBuriedPlants' as const;

export default createFetchConfig(plantsBuriedFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/me/plants/buried',
    method: 'GET',
  },
  getRequestOptions: ({
    page = {
      pageNumber: 0,
      pageSize: 0xffffffff,
    },
  }: IBuriedPlantsRequest) => ({
    params: { ...page },
    mapper: (response: IFetchPlantsBuriedResponse) => response.map(mapperPlant),
  }),
  mockValue: plantsRaw,
});
