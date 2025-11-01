import { createUseStyles } from 'react-jss';

import { colors } from '@/shared/theme';

export default createUseStyles({
  plantCollection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 125,
    height: 145,
    padding: 10,
    whiteSpace: 'pre-wrap',
    backgroundColor: colors.G900,
    borderRadius: [0, 30, 0, 30],
    cursor: 'pointer',
  },

  plantCollection1: {
    position: 'relative',
    width: '100%',
    height: 'fit-content',
    padding: 10,
    backgroundColor: colors.G900,
    borderRadius: [0, 30, 0, 30],
  },

  plantCollectionInner1: {
    top: 0,
    left: 0,
    width: '100%',
    minHeight: '100%',
    display: 'flex',
    height: 'fit-content',
    whiteSpace: 'pre-wrap',
    cursor: 'pointer',
  },

  collectionIcon: {
    height: 100,
    width: 100,
  },

  collectionIcon1: {
    height: '100%',
    width: 100,
    float: 'left',
    marginRight: 10,
    flex: 'none',
  },
});
