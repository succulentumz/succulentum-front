import { createUseStyles } from 'react-jss';

import { colors } from '@/shared/theme';

export default createUseStyles({
  addPlantFolder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    width: 125,
    height: 145,
    padding: 10,
    whiteSpace: 'pre-wrap',
    backgroundColor: colors.T800,
    borderRadius: [0, 30, 0, 30],
    cursor: 'pointer',
    color: colors.W100,
  },

  addPlantFolderIcon: {
    height: 100,
    width: 100,

    '& img': {
      borderRadius: 16,
    },
  },
});
