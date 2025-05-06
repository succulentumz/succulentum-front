import { createUseStyles } from 'react-jss';

import { animations, zIndexes } from '../../../../theme';

const TOASTER_GAP = 6;
const TOASTER_WIDTH = 356;
const TOASTER_POSITION_TOP = 25;
const TOASTER_POSITION_RIGHT = 25;
const TOASTER_ENTER_TRANSLATE_Y = 25;

export default createUseStyles({
  root: {
    position: 'fixed',
    top: TOASTER_POSITION_TOP,
    right: TOASTER_POSITION_RIGHT,
    zIndex: zIndexes.TOASTER,
    display: 'flex',
    flexDirection: 'column',
    gap: TOASTER_GAP,

    '&:empty': {
      pointerEvents: 'none',
    },
  },

  toaster: {
    width: TOASTER_WIDTH,
    pointerEvents: 'auto',
  },

  enter: {
    opacity: 0,
    transform: `translateY(${TOASTER_ENTER_TRANSLATE_Y}px)`,
  },

  enterActive: {
    transform: 'translateY(0)',
    opacity: 1,
    transition: animations.defaultTransition,
    transitionProperty: ['transform', 'opacity'],
  },

  exitActive: {
    opacity: 0,
    transition: animations.defaultTransition,
    transitionProperty: 'opacity',
  },
});
