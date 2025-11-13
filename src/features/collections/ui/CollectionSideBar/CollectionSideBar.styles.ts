import { createUseStyles } from 'react-jss';

import { colors } from '@/shared/theme';

export default createUseStyles({
  sidebar: {
    minHeight: '100%',
    height: 'stretch',
    maxWidth: 'fit-content',
    width: '30%',
    backgroundColor: colors.W100,
    flex: 'none',
    display: 'flex',
    flexDirection: 'column',
  },

  sidebarHeader: {
    width: '100%',
    height: 100,
    backgroundColor: colors.G800,
    textAlign: 'center',
    alignContent: 'center',
  },

  sidebarMain: {
    padding: 20,
  },

  filterContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  sidebarFooter: {
    display: 'flex',
    overflow: 'hidden',
    padding: 20,
    justifyContent: 'space-between',
  },
});
