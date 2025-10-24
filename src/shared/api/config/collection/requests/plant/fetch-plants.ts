import { type Nullable } from '@/shared/model';

import { hosts } from '../../../../../config';
import { createFetchConfig } from '../../../../helpers';
import { plantsRaw } from '../../fixtures/plants';
import { mapperPlant } from '../../mappers';
import { type ICollection, type IFolder, type IPlantRaw } from '../../model';

export interface IFetchPlantsRequest {
  collectionId: ICollection['id'];
  folderId: Nullable<IFolder['id']>;
}

export type IFetchPlantsResponse = IPlantRaw[];

export const plantsFetchKey = 'fetchPlants' as const;

export default createFetchConfig(plantsFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/plants',
    method: 'GET',
  },
  getRequestOptions: ({ collectionId, folderId = null }: IFetchPlantsRequest) => ({
    params: { collectionId, folderId },
    mapper: (response: IFetchPlantsResponse) => response.map(mapperPlant),
  }),
  mockValue: plantsRaw,
});
