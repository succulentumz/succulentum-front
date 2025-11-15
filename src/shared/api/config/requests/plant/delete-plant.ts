import { hosts } from '../../../../config';
import { createFetchConfig } from '../../../helpers';
import { type IPlant } from '../../model';

export interface IDeletePlantRequest {
  plantId: IPlant['id'];
}

export const plantDeleteKey = 'deletePlant' as const;

export default createFetchConfig(plantDeleteKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/plants/:plantId',
    method: 'DELETE',
  },
  getRequestOptions: ({ plantId }: IDeletePlantRequest) => ({
    params: { plantId },
    mapper: () => ({ status: 'OK' }),
  }),
  mockValue: { status: 'OK' },
});
