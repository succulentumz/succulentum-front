import { createUseStyles } from 'react-jss';

import { colors } from '@/shared/theme';

export default createUseStyles({
  filterBox: {
    display: 'flex',
    flex: 'none',
    borderColor: colors.N900,
    borderRadius: 10,
    width: '100%',
    border: '1px solid',
  },

  inputBox: {
    minWidth: 80,
    padding: 5,
  },

  prettyInput: {
    borderColor: colors.G800,
    backgroundColor: colors.W100,
    paddingLeft: 20,
    height: 40,
    borderRadius: 10,
    margin: 0,
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'left',
  },

  prettyButton: {
    padding: ['0.1em', '1em'],
    height: '3em',
    border: '1px solid',
    borderRadius: '5em',
    backgroundColor: colors.W100,
    '&:hover': {
      borderColor: colors.G800,
    },
  },

  deleteButton: {
    padding: ['0.1em', '1em'],
    height: '3em',
    border: '1px solid',
    borderRadius: '5em',
    backgroundColor: colors.R800,
    borderColor: colors.R900,
    '&:hover': {
      backgroundColor: colors.R200,
      borderColor: colors.R600,
    },
  },

  prettyLabel: {
    alignContent: 'center',
    borderRadius: [10, 0, 0, 10],
    border: '1px solid',
    borderColor: colors.N900,
    width: '2.0em',
    paddingLeft: '0.5em',
    boxSizing: 'border-box',
    borderWidth: [0, 1, 0, 0],
  },

  prettyBar: {
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

  centredParagraph: {
    textAlign: 'center',
    margin: 0,
  },
});
