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

  filterbox: {
    display: 'flex',
    flex: 'none',
    borderColor: colors.N900,
    borderRadius: 10,
    width: '100%',
    border: '1px solid',
  },

  filterContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  sidebarFooter: {
    overflow: 'hidden',
    padding: 20,
  },
});
