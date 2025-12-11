import { createUseStyles } from 'react-jss';

import { colors } from '@/shared/theme';

export default createUseStyles({
  addEntryItem: {
    width: '100%',
    maxWidth: '100%',
    minHeight: 60,
    height: 'fit-content',
    boxSizing: 'border-box',
    borderRadius: 10,
    backgroundColor: colors.B600,
  },

  inner: {
    boxSizing: 'border-box',
    minHeight: 60,
    width: '100%',
    maxWidth: '100%',
    padding: [10, 20],
  },

  innerCentred: {
    cursor: 'pointer',
    whiteSpace: 'pre-wrap',
    color: colors.W100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
