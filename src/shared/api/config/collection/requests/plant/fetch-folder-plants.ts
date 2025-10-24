import { hosts } from '../../../../../config';
import { createFetchConfig } from '../../../../helpers';
import { plantsRaw } from '../../fixtures/plants';
import { mapperPlant } from '../../mappers';
import { type IFolder, type IPlantRaw } from '../../model';

export interface IFetchPlantRequest {
  folderId: IFolder['id'];
}

export const folderPlantsFetchKey = 'fetchFolderPlants' as const;

export default createFetchConfig(folderPlantsFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/plants/:folderId',
    method: 'GET',
  },
  getRequestOptions: ({ folderId }: IFetchPlantRequest) => ({
    params: { folderId },
    mapper: (response: IPlantRaw[]) => response.map(mapperPlant),
  }),
  mockValue: plantsRaw,
});
