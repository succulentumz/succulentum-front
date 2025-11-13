import React, { type ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';

import { IconButton } from '@/shared/ui';

import useStyles from './ModalOverlay.styles';

export interface ModalOverlayProps {
  title?: string;
  onClose: () => void;
  children: ReactNode;
  isOpen: () => boolean;
}

export const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClose, children, title, isOpen }) => {
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
    <CSSTransition
      in={isOpen()}
      // onExited={refreshState}
      timeout={200}
      classNames="modal"
      unmountOnExit
    >
      <div className={classes.modalOverlay} onClick={handleOverlayClick}>
        <div className={classes.modalContent}>
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
