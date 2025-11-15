import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { plantsRaw } from '../../fixtures/plants';
import { mapperPlant } from '../../mappers';
import { type IFolder, type IPlantRaw } from '../../model';

export interface IFetchFolderPlantsRequest {
  folderId: IFolder['id'];
}

export const folderPlantsFetchKey = 'fetchFolderPlants' as const;

export default createFetchConfig(folderPlantsFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/folders/:folderId/plants',
    method: 'GET',
  },
  getRequestOptions: ({ folderId }: IFetchFolderPlantsRequest) => ({
    params: { folderId },
    mapper: (response: IPlantRaw[]) => response.map(mapperPlant),
  }),
  mockValue: plantsRaw,
});
