import { createUseStyles } from 'react-jss';

import { colors } from '@/shared/theme';

export default createUseStyles({
  entry: {
    position: 'relative',
    width: '100%',
    maxWidth: '100%',
    minHeight: 60,
    height: 'fit-content',
    borderRadius: 10,
    backgroundColor: colors.N50,
    padding: [10, 20],
    boxSizing: 'border-box',
  },

  entryInner: {
    boxSizing: 'border-box',
    width: '100%',
    minHeight: '100%',
    height: 'fit-content',
    cursor: 'pointer',
  },

  date: {
    float: 'right',
    color: colors.N80,
  },

  content: {},

  truncateBlur: {
    boxSizing: 'border-box',
    height: '1.4em',
    lineHeight: '1.4em',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    position: 'relative',
    width: '100%',
    maxWidth: '100%',

    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      width: 40 /* Ширина градиента */,
      height: '100%',

      background: `linear-gradient(
        90deg,
        transparent 0%,
        ${colors.N50} 100%
      )`,
    },
  },
});
