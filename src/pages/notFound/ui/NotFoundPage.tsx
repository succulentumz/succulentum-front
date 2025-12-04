import { type FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Splash } from '@/shared/ui';

import useStyles from './NotFoundPage.styles';

export const NotFoundPage: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.notFoundPage}>
      <div className={classes.content}>
        <Splash icon="eyes">404</Splash>
        <NavLink className={classes.link} to="/">
          На главную
        </NavLink>
      </div>
    </div>
  );
};
