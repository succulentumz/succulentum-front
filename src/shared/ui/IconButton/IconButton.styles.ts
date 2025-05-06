import { createUseStyles } from 'react-jss';
import { animations } from '../../theme';

const BUTTON_SIZE_S = 24;
const BUTTON_SIZE_M = 32;
const ICON_SIZE = 20;

export const useStyles = createUseStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    outline: 'none',
    boxSizing: 'border-box',
    transition: animations.defaultTransition,
    transitionProperty: 'background-color, color, border-color',
    border: 'none',
    position: 'relative',
    boxShadow: 'none',
    borderRadius: '50%',
    background: 'none',
    padding: 0,
    flexShrink: 0,

    '&:disabled': {
      extend: 'disabled',
    },

    '&:active': {
      extend: 'active',
    },
  },

  'cancel-light': {},

  cancel: {},

  main: {},

  custom: {},

  active: {},

  disabled: {
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },

  loading: {
    '& $loader': {
      display: 'block',
    },
  },

  icon: {
    display: 'flex',
    alignItems: 'center',
    width: ICON_SIZE,
    height: ICON_SIZE,
  },

  loader: {
    display: 'none',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',

    width: ICON_SIZE,
    height: ICON_SIZE,
  },

  s: {
    width: BUTTON_SIZE_S,
    height: BUTTON_SIZE_S,
  },

  m: {
    width: BUTTON_SIZE_M,
    height: BUTTON_SIZE_M,
  },
});
