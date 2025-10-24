import { createUseStyles } from 'react-jss';

import { colors } from '../../theme';

export const useStyles = createUseStyles({
  root: {
    borderRadius: 8,
    position: 'relative',
    background: colors.W100,
    padding: [20, 40, 20, 20],
    display: 'flex',
  },

  iconContainer: {
    width: 20,
    height: 20,
    flexShrink: 0,
    marginRight: 16,
  },

  error: {
    color: colors.R600,
  },

  info: {
    color: colors.B600,
  },

  warning: {
    color: colors.O600,
  },

  ok: {
    color: colors.G600,
  },

  'not-ok': {
    color: colors.N100,
  },

  text: {},

  title: {},

  content: {
    '&:not(:first-child):not(:empty)': {
      marginTop: 16,
    },
  },

  close: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
  },
});
