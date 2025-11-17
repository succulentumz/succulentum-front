import { type FC } from 'react';

import { DefaultPreloader } from './DefaultPreloader';

import useStyles from './Loader.styles';

export interface ILoaderProps {}

export const Loader: FC<ILoaderProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.loader}>
      <div className={classes.icon}>
        <div className={classes.loaderWrapper}>
          <DefaultPreloader />
        </div>
      </div>
    </div>
  );
};
