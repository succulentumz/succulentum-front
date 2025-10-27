import { createUseStyles } from 'react-jss';

import { colors } from '@/shared/theme';

export default createUseStyles({
  sidebar: {
    height: '100%',
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

  collectionPage: {
    height: '100%',
    backgroundColor: colors.G30,
    display: 'flex',
  },

  content: {
    padding: 30,
    align: 'right',
    display: 'flex',
    gap: 20,
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },

  inputBox: {
    minWidth: 80,
    padding: 5,
  },

  searchbar: {
    borderColor: colors.G800,
    paddingLeft: 20,
    height: 40,
    borderRadius: 10,
    margin: 0,
    width: '100%',
    boxSizing: 'border-box',
  },

  filterbox: {
    display: 'flex',
    borderColor: colors.N900,
    borderRadius: 10,
    width: '100%',
    border: '1px solid',
  },

  filterbar: {
    borderRadius: [0, 10, 10, 0],
    paddingLeft: '0.1em',
    overflow: 'hidden',
    height: 20,
    border: 0,
    margin: 0,
    width: '8em',
    outline: 0,
    boxSizing: 'border-box',
    '&:focus-visible': {
      outline: 0,
    },
  },

  smallLeftFilterLabel: {
    alignContent: 'center',
    borderRadius: [10, 0, 0, 10],
    border: '1px solid',
    borderColor: colors.N900,
    width: '2.0em',
    paddingLeft: '0.5em',
    boxSizing: 'border-box',
    borderWidth: [0, 1, 0, 0],
  },

  filterContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  backButton: {
    marginRight: 20,
    padding: ['0.1em', '1em'],
    height: '3em',
    backgroundColor: colors.W100,
    border: '1px solid',
    borderRadius: '5em',
    alignSelf: 'flex-end',
  },
});
