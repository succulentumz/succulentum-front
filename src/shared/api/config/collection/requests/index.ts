import collection from './collection';
import folder from './folder';
import plant from './plant';

export default {
  ...collection,
  ...folder,
  ...plant,
};

export * from './collection';
export * from './folder';
export * from './plant';
