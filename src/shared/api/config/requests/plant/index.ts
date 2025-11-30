import buryPlant from './bury-plant';
import createPlant from './create-plant';
import deletePlant from './delete-plant';
import editPlant from './edit-plant';
import fetchFolderPlants from './fetch-folder-plants';
import fetchPlant from './fetch-plant';
import fetchPlants from './fetch-plants';
import fetchPlantsBuried from './fetch-plants-buried';

export default {
  ...createPlant,
  ...deletePlant,
  ...editPlant,
  ...fetchFolderPlants,
  ...fetchPlant,
  ...fetchPlants,
  ...buryPlant,
  ...fetchPlantsBuried,
};

export * from './bury-plant';
export * from './create-plant';
export * from './delete-plant';
export * from './edit-plant';
export * from './fetch-folder-plants';
export * from './fetch-plant';
export * from './fetch-plants';
export * from './fetch-plants-buried';
