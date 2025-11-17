import clsx from 'clsx';
import React, { type FC, useId } from 'react';

import useStyles from './PrettyComponents.styles';

export const PrettyInput: FC<React.ComponentProps<'input'>> = (props) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.inputBox, props.className)}>
      <input {...props} className={classes.prettyInput} />
    </div>
  );
};

export const PrettyButton: FC<React.ComponentProps<'button'>> = (props) => {
  const classes = useStyles();
  return <button {...props} className={clsx(classes.prettyButton, props.className)} />;
};

export const DeleteButton: FC<React.ComponentProps<'button'>> = (props) => {
  const classes = useStyles();
  return <button {...props} className={[classes.deleteButton, props.className].join(' ')} />;
};

export interface PrettyLabeledSmallInputProps extends React.ComponentProps<'input'> {
  label?: string;
}

export const PrettyLabeledSmallInput: FC<PrettyLabeledSmallInputProps> = (props) => {
  const classes = useStyles();
  const id = useId();
  return (
    <div className={clsx(classes.inputBox, props.className)}>
      <div className={classes.filterBox}>
        <div className={classes.prettyLabel}>
          <label htmlFor={id}> {props.label} </label>
        </div>
        <input {...props} className={classes.prettyBar} id={id} />
      </div>
    </div>
  );
};

export interface CentredParagraphProps {
  children?: React.ReactNode;
}

export const CentredParagraph: FC<CentredParagraphProps> = ({ children }) => {
  const classes = useStyles();
  return <p className={classes.centredParagraph}>{children}</p>;
};
