import { forwardRef } from 'react';
import clsx from 'clsx';
import { renderIcon, IIcon } from '../Icon';
import { IIconButtonSize, IIconButtonView, IIconButtonHTMLBaseProps } from './types';
import { useStyles } from './IconButton.styles';
import { Loader } from '../Loader';

export interface IIconButtonProps extends IIconButtonHTMLBaseProps {
  icon: IIcon;
  /** @default 'm' */
  size?: IIconButtonSize;
  /** @default 'cancel-light' */
  view?: IIconButtonView;
  /** @default false */
  isDisabled?: boolean;
  /** @default false */
  isActive?: boolean;
  /** @default false */
  isLoading?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IIconButtonProps>(
  (
    {
      icon,
      size = 'm',
      view = 'cancel-light',
      isDisabled = false,
      isActive = false,
      isLoading = false,
      type = 'button',
      onClick,
      ...restProps
    },
    ref,
  ) => {
    const classes = useStyles();

    const hasNoAction = isDisabled || isLoading;

    return (
      <button
        ref={ref}
        className={clsx(classes.root, classes[view], classes[size], {
          [classes.disabled]: isDisabled,
          [classes.active]: isActive,
          [classes.loading]: isLoading,
        })}
        type={type}
        disabled={isDisabled}
        onClick={hasNoAction ? undefined : onClick}
        {...restProps}
      >
        {isLoading ? (
          <span className={classes.loader}>
            <Loader />
          </span>
        ) : (
          <span className={classes.icon}>{renderIcon(icon)}</span>
        )}
      </button>
    );
  },
);
