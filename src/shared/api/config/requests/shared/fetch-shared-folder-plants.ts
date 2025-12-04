import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { plantsRaw } from '../../fixtures/plants';
import { mapperPlant } from '../../mappers';
import { type ICollection, type IFolder, type IPlantRaw } from '../../model';

export interface IFetchSharedFolderPlantsRequest {
  token: ICollection['sharedLink'];
  folderId: IFolder['id'];
}

export type IFetchFolderPlantsResponse = IPlantRaw[];

export const sharedFolderPlantsFetchKey = 'fetchSharedFolderPlants' as const;

export default createFetchConfig(sharedFolderPlantsFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/shared/collections/:token/folders/:folderId',
    method: 'GET',
  },
  getRequestOptions: ({ token, folderId }: IFetchSharedFolderPlantsRequest) => ({
    params: { token, folderId },
    mapper: (response: IFetchFolderPlantsResponse) => response.map(mapperPlant),
  }),
  mockValue: plantsRaw,
});
