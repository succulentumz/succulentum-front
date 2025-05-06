import { FC } from 'react';
import { ComplexIconBoilerplate, IconBoilerplate } from './components';
import { isComplexIcon } from './helpers';
import { IIconType } from './types';
import { useStyles } from './Icon.styles';

export interface IIconProps {
  type: IIconType;
}

export const Icon: FC<IIconProps> = ({ type }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {isComplexIcon(type) ? (
        <ComplexIconBoilerplate type={type} />
      ) : (
        <IconBoilerplate type={type} />
      )}
    </div>
  );
};
