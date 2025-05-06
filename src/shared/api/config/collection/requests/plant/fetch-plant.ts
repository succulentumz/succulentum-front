import { hosts } from '../../../../../config';
import { createFetchConfig } from '../../../../helpers';
import { plantRaw } from '../../fixtures/plants';
import { mapperPlant } from '../../mappers';
import { IFolder } from '../../model';

export interface IFetchPlantRequest {
  folderId: IFolder['id'];
}

export const plantFetchKey = 'fetchPlant' as const;

export default createFetchConfig(plantFetchKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/plants/:folderId',
    method: 'GET',
  },
  getRequestOptions: ({ folderId }: IFetchPlantRequest) => ({
    params: { folderId },
    mapper: mapperPlant,
  }),
  mockValue: plantRaw,
});
