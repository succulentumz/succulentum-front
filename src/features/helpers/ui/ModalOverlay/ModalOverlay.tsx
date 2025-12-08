import React, { type ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';

import useStyles from './ModalOverlay.styles';

export interface ModalOverlayProps {
  title?: string;
  onClose: () => void;
  children: ReactNode;
  isOpen: () => boolean;
  fullscreen?: boolean; // ← Добавил
}

export const ModalOverlay: React.FC<ModalOverlayProps> = ({
  onClose,
  children,
  title,
  isOpen,
  fullscreen = false // ← Добавил
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
    <CSSTransition
      in={isOpen()}
      timeout={200}
      classNames="modal"
      unmountOnExit
    >
      <div className={classes.modalOverlay} onClick={handleOverlayClick}>
        <div className={`${classes.modalContent} ${fullscreen ? classes.fullscreen : ''}`}>
          <div className={classes.modalHeader}>
            <h2 className={classes.modalTitle}>{title}</h2>
            <button className={classes.modalClose} onClick={handleClose}>
              ×
            </button>
          </div>
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};
