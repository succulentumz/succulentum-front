import { createUseStyles } from 'react-jss';

import { colors } from '@/shared/theme';

export default createUseStyles({
  collectionFolder: {
    position: 'relative',
    width: 145,
    height: 165,
    backgroundColor: colors.N80,
    borderRadius: [0, 30, 0, 30],
    cursor: 'pointer',
  },

  collectionFolderInner: {
    boxSizing: 'border-box',
    padding: 10,
    width: '100%',
    minHeight: '100%',
    height: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    whiteSpace: 'pre-wrap',
    cursor: 'pointer',
  },

  folderIcon: {
    height: 100,
    width: 100,
  },
});
