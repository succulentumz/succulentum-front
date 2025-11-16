import { createUseStyles } from 'react-jss';

import { colors } from '@/shared/theme';

export default createUseStyles({
  sidebarContainer: {
    zIndex: 1,
    position: 'relative',
    maxWidth: 'fit-content',
    width: '30%',
    minWidth: 'min-content',
    minHeight: '100%',
    flex: 'none',
  },

  sidebarContainerCollapsed: {
    position: 'absolute',
    pointerEvents: 'none',
  },

  sidebar: {
    transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    top: 0,
    left: 0,
    minHeight: '100%',
    height: '100vh',
    maxWidth: 'fit-content',
    width: '100%',
    minWidth: 'min-content',
    backgroundColor: colors.W100,
    flex: 'none',
    display: 'flex',
    flexDirection: 'column',
  },

  sidebarCollapsed: {
    transform: 'translateX(-100%)',
  },

  toggleButton: {
    pointerEvents: 'all',
    position: 'absolute',
    top: '20px',
    left: '20px',
    zIndex: 1,
    background: colors.B600,
    border: 'none',
    borderRadius: '8px',
    width: 'fit-content',
    height: 'fit-content',
    cursor: 'pointer',
    padding: 0,

    '&:hover': {
      background: colors.B800,
    },
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
