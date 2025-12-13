import clsx from 'clsx';
import React, { type FC } from 'react';

import { IconButton } from '@/shared/ui';

import useStyles from './Redaction.styles';

export interface RedactionProps extends React.ComponentProps<'div'> {
  onClick: () => void;
}

export const RedactionButton: FC<RedactionProps> = (props) => {
  const classes = useStyles();

  return (
    <div {...props} className={clsx(classes.redactionButton, props.className)}>
      <IconButton onClick={props.onClick} icon="pencil" />
    </div>
  );
};
