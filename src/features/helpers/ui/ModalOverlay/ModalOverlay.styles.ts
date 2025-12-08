import { createUseStyles } from 'react-jss';

import { colors } from '@/shared/theme';

export const timeOut = 200;

export default createUseStyles({
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,

    '&.modal-enter': {
      opacity: 0,
    },
    '&.modal-enter-active': {
      opacity: 1,
      transition: `opacity ${timeOut}ms ease-in-out`,
    },
    '&.modal-exit': {
      opacity: 1,
    },
    '&.modal-exit-active': {
      opacity: 0,
      transition: `opacity ${timeOut}ms ease-in-out`,
    },
  },

  modalContent: {
    background: colors.W100,
    borderRadius: 8,
    padding: 10,
    width: 'fit-content',
    height: 'fit-content',
    maxWidth: '75%',
    maxHeight: '75%',
    overflowY: 'auto',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',

    '&.modal-enter': {
      transform: 'scale(0.9) translateY(-20px)',
      opacity: 0,
    },
    '&.modal-enter-active': {
      transform: 'scale(1) translateY(0)',
      opacity: 1,
      transition: 'transform 300ms ease-in-out, opacity 300ms ease-in-out',
    },
    '&.modal-exit': {
      transform: 'scale(1) translateY(0)',
      opacity: 1,
    },
    '&.modal-exit-active': {
      transform: 'scale(0.9) translateY(-20px)',
      opacity: 0,
      transition: 'transform 300ms ease-in-out, opacity 300ms ease-in-out',
    },
  },

  fullscreen: { // ← Добавил стиль для fullscreen
    maxWidth: '95% !important',
    maxHeight: '95% !important',
    width: '95vw !important',
    height: '95vh !important',
    padding: '2rem !important',
    backgroundColor: '#23F377 !important', // цвет фона как в PlantModal
    borderRadius: '20px !important',
  },

  modalClose: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: colors.N100,
    padding: 0,
    width: 30,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      color: colors.N300,
      backgroundColor: colors.N20,
      borderRadius: '50%',
    },
  },

  modalTitle: {
    margin: 5,
  },

  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    borderStyle: 'solid',
    borderWidth: [0, 0, 1, 0],
    borderColor: colors.N100,
  },
});
