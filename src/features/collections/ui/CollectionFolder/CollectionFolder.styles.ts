import { colors } from '@/shared/theme';
import { createUseStyles } from 'react-jss';

export default createUseStyles({
  collectionFolder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 125,
    height: 145,
    padding: 10,
    whiteSpace: 'pre-wrap',
    backgroundColor: colors.N80,
    borderRadius: [0, 30, 0, 30],
    cursor: 'pointer',
  },

  folderIcon: {
    height: 100,
    width: 100,
  },
});
