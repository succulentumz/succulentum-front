import React, { type FC } from 'react';

import { IconButton } from '@/shared/ui';

import useStyles from './Redaction.styles';

export interface RedactionProps {
  onClick: () => void;
}

export const RedactionButton: FC<RedactionProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.redactionButton}>
      <IconButton onClick={props.onClick} icon="pencil" />
    </div>
  );
};
