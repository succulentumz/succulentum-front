import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { plantsRaw } from '../../fixtures/plants';
import { mapperPlant } from '../../mappers';
import { type IPlant, type IPlantRaw, type IPageable } from '../../model';

export interface IPlantsRequest {
  filter?: Partial<
    Omit<IPlant, 'id' | 'createdAt' | 'updatedAt' | 'ownerId' | 'deathDate' | 'price' | 'birthDate'>
  >;
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
    filter,
    page = {
      offset: 0,
      pageNumber: 0,
      pageSize: 0xffffffff,
    },
  }: IPlantsRequest) => ({
    params: { ...filter, ...page },
    mapper: (response: IFetchPlantsResponse) => response.map(mapperPlant),
  }),
  mockValue: plantsRaw,
});
