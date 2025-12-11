import clsx from 'clsx';
import React, { type ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';

import { IconButton } from '@/shared/ui';

import useStyles from './ModalOverlay.styles';

export interface ModalOverlayProps {
  title?: string;
  onClose: () => void;
  children: ReactNode;
  isOpen: () => boolean;
  insideClick?: () => void;
  fullscreen?: boolean;
}

export const ModalOverlay: React.FC<ModalOverlayProps> = ({
  onClose,
  children,
  title,
  isOpen,
  insideClick,
  fullscreen = false,
}) => {
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    // @ts-ignore
    <CSSTransition in={isOpen()} timeout={200} classNames="modal" unmountOnExit>
      <div className={classes.modalOverlay} onClick={handleOverlayClick}>
        <div
          className={clsx(classes.modalContent, fullscreen && classes.fullscreen)}
          onClick={insideClick}
        >
          <div className={classes.modalHeader}>
            <h2 className={classes.modalTitle}>{title}</h2>
            {/* <IconButton /!*className={classes.modalClose}*!/ onClick={handleClose} icon="close" />*/}
            <IconButton onClick={handleClose} icon="close" />
          </div>
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};
