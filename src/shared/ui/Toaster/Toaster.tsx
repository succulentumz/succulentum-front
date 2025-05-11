import { FC, ReactNode, useEffect } from 'react';
import clsx from 'clsx';
import {
  addDataTestId,
  isEmpty,
  isNotEmpty,
  isReactNodeNotEmpty,
} from '@true-engineering/true-react-platform-helpers';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { DEFAULT_TIMEOUT } from './constants';
import { IToasterType } from './types';
import { useStyles } from './Toaster.styles';

export interface IToasterProps {
  /** @default 'error' */
  type?: IToasterType;
  title?: ReactNode;
  text?: ReactNode;
  children?: ReactNode;
  /**
   * Время автоматического закрытия тостера в миллисекундах
   * @default 7000
   */
  timeout?: number;
  /** @default false */
  hasCloseButton?: boolean;
  /** @default false */
  shouldCloseOnClick?: boolean;
  onClose?: () => void;
  onTimeEnd?: () => void;
}

export const Toaster: FC<IToasterProps> = ({
  type = 'error',
  title,
  text,
  children,
  timeout = DEFAULT_TIMEOUT,
  hasCloseButton = true,
  shouldCloseOnClick = false,
  onClose,
  onTimeEnd,
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (!Number.isFinite(timeout) || isEmpty(onTimeEnd)) {
      return;
    }

    const timeoutId = window.setTimeout(() => onTimeEnd(), timeout);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className={classes.root} onClick={shouldCloseOnClick ? onClose : undefined}>
      <div className={clsx(classes.iconContainer, classes[type])}>
        <Icon type={`status-${type}`} />
      </div>
      <div>
        {isReactNodeNotEmpty(title) && <div className={classes.title}>{title}</div>}
        {isReactNodeNotEmpty(text) && <div className={classes.text}>{text}</div>}
        {isReactNodeNotEmpty(children) && <div className={classes.content}>{children}</div>}
      </div>
      {hasCloseButton && isNotEmpty(onClose) && (
        <div className={classes.close}>
          <IconButton view="cancel-light" icon="close-window" onClick={onClose} />
        </div>
      )}
    </div>
  );
};
