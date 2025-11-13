import React, { type FC, useId } from 'react';

import useStyles from './PrettyComponents.styles';

export const PrettyInput: FC<React.ComponentProps<'input'>> = (props) => {
  const classes = useStyles();
  return (
    <div className={[classes.inputBox, props.className].join(' ')}>
      <input {...props} className={classes.prettyInput} />
    </div>
  );
};

export const PrettyButton: FC<React.ComponentProps<'button'>> = (props) => {
  const classes = useStyles();
  return <button {...props} className={[classes.prettyButton, props.className].join(' ')} />;
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
    <div className={[classes.inputBox, props.className].join(' ')}>
      <div className={classes.filterBox}>
        <div className={classes.prettyLabel}>
          <label htmlFor={id}> {props.label} </label>
        </div>
        <input {...props} className={classes.prettyBar} id={id} />
      </div>
    </div>
  );
};
