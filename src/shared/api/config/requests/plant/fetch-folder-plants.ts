// import { hosts } from '../../../../config';
// import { createFetchConfig } from '../../../helpers';
// import { plantsRaw } from '../../fixtures/plants';
// import { mapperPlant } from '../../mappers';
// import { type IFolder, type IPageable, type IPlantRaw, pageableMax } from '../../model';
//
// export interface IFetchFolderPlantsRequest {
//   page?: IPageable;
//   folderId: IFolder['id'];
// }
//
// export const folderPlantsFetchKey = 'fetchFolderPlants' as const;
//
// export default createFetchConfig(folderPlantsFetchKey, {
//   config: {
//     host: hosts.gateway,
//     pathTemplate: '/api/folders/:folderId/plants',
//     method: 'GET',
//   },
//   getRequestOptions: ({
//     folderId,
//     page = {
//       pageNumber: 1,
//       pageSize: pageableMax,
//     },
//   }: IFetchFolderPlantsRequest) => ({
//     params: { folderId, ...page },
//     mapper: (response: IPlantRaw[]) => response.map(mapperPlant),
//   }),
//   mockValue: plantsRaw,
// });
