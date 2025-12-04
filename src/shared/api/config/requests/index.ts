import collection from './collection';
import folder from './folder';
import plant from './plant';
import shared from './shared';

export default {
  ...collection,
  ...folder,
  ...plant,
  ...shared,
};

export * from './collection';
export * from './folder';
export * from './plant';
export * from './shared';
