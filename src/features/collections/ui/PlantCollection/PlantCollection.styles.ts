import { createUseStyles } from 'react-jss';

import { colors } from '@/shared/theme';

export default createUseStyles({
  plantCollection: {
    position: 'relative',
    width: 125,
    height: 145,
    padding: 10,
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

  plantCollectionInner: {
    width: '100%',
    minHeight: '100%',
    height: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    whiteSpace: 'pre-wrap',
    cursor: 'pointer',
  },

  plantCollectionInner1: {
    width: '100%',
    minHeight: '100%',
    height: 'fit-content',
    display: 'flex',
    whiteSpace: 'pre-wrap',
    cursor: 'pointer',
  },

  collectionIcon: {
    height: 100,
    width: 100,
    flex: 'none',
  },

  collectionIcon1: {
    height: '100%',
    width: 100,
    marginRight: 10,
    flex: 'none',
  },
});
