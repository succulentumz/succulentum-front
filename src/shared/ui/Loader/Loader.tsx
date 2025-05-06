import { type FC } from 'react';

import useStyles from './Loader.styles';
import { DefaultPreloader } from './DefaultPreloader';

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
