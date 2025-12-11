import login from './login';
import register from './register';

export default {
  ...register,
  ...login,
};

export * from './login';
export * from './register';
