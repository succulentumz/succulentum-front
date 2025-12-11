import auth from './auth';
import collection from './collection';
import folder from './folder';
import me from './me';
import plant from './plant';
import shared from './shared';

export default {
  ...collection,
  ...folder,
  ...plant,
  ...shared,
  ...me,
  ...auth,
};

export * from './auth';
export * from './collection';
export * from './folder';
export * from './me';
export * from './plant';
export * from './shared';
