import { type Nullable } from '@/shared/model';

import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { plantRaw } from '../../fixtures/plants';
import { mapperPlant } from '../../mappers';
import { type IPlant } from '../../model';

export interface IEditPlantRequestParams {
  plantId: IPlant['id'];
}

export type IEditPlantRequestBody = Nullable<Omit<IPlant, 'id' | 'createdAt' | 'updatedAt'>>;

export type IEditPlantRequest = IEditPlantRequestParams & IEditPlantRequestBody;

export const plantEditKey = 'editPlant' as const;

export default createFetchConfig(plantEditKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/plants/:plantId',
    method: 'PATCH',
  },
  getRequestOptions: ({ plantId, ...body }: IEditPlantRequest) => ({
    params: { plantId },
    body,
    mapper: mapperPlant,
  }),
  mockValue: plantRaw,
});
