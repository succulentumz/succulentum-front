import createPlant from './create-plant';
import deletePlant from './delete-plant';
import editPlant from './edit-plant';
import fetchFolderPlants from './fetch-folder-plants';
import fetchPlant from './fetch-plant';
import fetchPlants from './fetch-plants';

export default {
  ...createPlant,
  ...deletePlant,
  ...editPlant,
  ...fetchFolderPlants,
  ...fetchPlants,
  ...fetchPlant,
};

export * from './create-plant';
export * from './delete-plant';
export * from './edit-plant';
export * from './fetch-folder-plants';
export * from './fetch-plant';
export * from './fetch-plants';
