import editMe from './edit-me';
import fetchMe from './fetch-me';

export default {
  ...editMe,
  ...fetchMe,
};

export * from './edit-me';
export * from './fetch-me';
