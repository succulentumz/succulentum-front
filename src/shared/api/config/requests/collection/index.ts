import createCollection from './create-collection';
import deleteCollection from './delete-collection';
import editCollection from './edit-collection';
import fetchCollection from './fetch-collection';
import fetchCollectionPlants from './fetch-collection-plants';
import fetchCollections from './fetch-collections';

export default {
  ...createCollection,
  ...deleteCollection,
  ...editCollection,
  ...fetchCollection,
  ...fetchCollections,
  ...fetchCollectionPlants,
};

export * from './create-collection';
export * from './delete-collection';
export * from './edit-collection';
export * from './fetch-collection';
export * from './fetch-collection-plants';
export * from './fetch-collections';
