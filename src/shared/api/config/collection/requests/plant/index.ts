import fetchPlant from './fetch-plant';
import fetchPlants from './fetch-plants';
import createPlant from './create-plant';
import deletePlant from './delete-plant';
import editPlant from './edit-plant';

export default {
  ...createPlant,
  ...deletePlant,
  ...editPlant,
  ...fetchPlant,
  ...fetchPlants,
};

export * from './create-plant';
export * from './delete-plant';
export * from './edit-plant';
export * from './fetch-plant';
export * from './fetch-plants';
