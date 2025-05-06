import { createUseStyles } from 'react-jss';

import { colors, typography } from '../../theme';

export const ICON_WRAPPER_SIZE = 72;

export default createUseStyles({
  splash: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    overflow: 'hidden',
  },

  iconWrapper: {
    display: 'flex',
    width: ICON_WRAPPER_SIZE,
    height: ICON_WRAPPER_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 32,
    borderRadius: '50%',
    backgroundColor: colors.B50,
    userSelect: 'none',
  },

  icon: {
    width: '1em',
    height: '1em',
  },

  content: {
    ...typography.common16,

    textAlign: 'center',
    color: colors.N80,
  },
});
