import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { plantsRaw } from '../../fixtures/plants';
import { mapperPlant } from '../../mappers';
import { type IPlantRaw, type IPageable, pageableMax } from '../../model';

export interface IBuriedPlantsRequest {
  page?: IPageable;
}

export type IFetchPlantsBuriedResponse = IPlantRaw[];

export const plantsBuriedFetchKey = 'fetchBuriedPlants' as const;

export default createFetchConfig(plantsBuriedFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/plants/buried',
    method: 'GET',
  },
  getRequestOptions: ({
    page = {
      pageNumber: 1,
      pageSize: pageableMax,
    },
  }: IBuriedPlantsRequest) => ({
    params: { ...page },
    mapper: (response: IFetchPlantsBuriedResponse) => response.map(mapperPlant),
  }),
  mockValue: plantsRaw,
});
