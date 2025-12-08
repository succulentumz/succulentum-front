import clsx from 'clsx';
import React, { type FC, type MouseEventHandler, useId } from 'react';

import { addToaster } from '@/shared/global';

import useStyles from './PrettyComponents.styles';

export const PrettyInput: FC<React.ComponentProps<'input'>> = (props) => {
  const classes = useStyles();
  const id = useId();
  return (
    <div className={clsx(classes.inputBox, props.className)}>
      <input id={id} {...props} className={classes.prettyInput} />
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
        <input {...{ ...props, label: undefined }} className={classes.prettyBar} id={id} />
      </div>
    </div>
  );
};

export interface CentredParagraphProps extends React.ComponentProps<'p'> {
  children?: React.ReactNode;
}

export const CentredParagraph: FC<CentredParagraphProps> = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <p
      {...{ ...props, children: undefined }}
      className={clsx(classes.centredParagraph, props.className)}
    >
      {children}
    </p>
  );
};

export interface PrettyCopyTextBarProps extends React.ComponentProps<'button'> {
  text: string;
  message: string;
  copytext?: string;
}

export const PrettyCopyTextBar: FC<PrettyCopyTextBarProps> = (props) => {
  const classes = useStyles();
  const onClick: MouseEventHandler = () => {
    navigator.clipboard
      .writeText(props.copytext ?? props.text)
      .then(() => addToaster({ type: 'info', text: props.message }));
  };
  return (
    <button
      {...{
        ...props,
        text: undefined,
        message: undefined,
        copytext: undefined,
      }}
      onClick={onClick}
      className={classes.prettyInput}
      style={{ cursor: 'pointer' }}
    >
      {props.text}
    </button>
  );
};
