import { hosts } from '../../../../../config';
import { createFetchConfig } from '../../../../helpers';
import { type ICollection } from '../../model';

export interface IDeleteCollectionRequest {
  collectionId: ICollection['id'];
}

export const collectionDeleteKey = 'deleteCollection' as const;

export default createFetchConfig(collectionDeleteKey, {
  config: {
    host: hosts.gateway,
    pathTemplate: '/api/collections/:collectionId',
    method: 'DELETE',
  },
  getRequestOptions: ({ collectionId }: IDeleteCollectionRequest) => ({
    params: { collectionId },
    mapper: () => ({ status: 'OK' }),
  }),
});
