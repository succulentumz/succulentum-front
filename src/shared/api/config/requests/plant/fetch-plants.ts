import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { plantsRaw } from '../../fixtures/plants';
import { mapperPlant } from '../../mappers';
import { type IPlantRaw, type IPageable, pageableMax, type IPlantFilter } from '../../model';

export interface IPlantsRequest {
  page?: IPageable;
  filter?: IPlantFilter;
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
      pageNumber: 1,
      pageSize: pageableMax,
    },
    filter,
  }: IPlantsRequest) => ({
    params: { ...page, ...filter },
    mapper: (response: IFetchPlantsResponse) => response.map(mapperPlant),
  }),
  mockValue: plantsRaw,
});
