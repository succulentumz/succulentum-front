import { createUseStyles } from 'react-jss';

import { animations, colors, helpers } from '@/shared/theme';

export default createUseStyles({
  layout: {
    position: 'relative',
    height: '100%',
    ...helpers.withScrollBar,
  },
  header: {
    height: 'min-content',
    display: 'flex',
    flexWrap: 'wrap',
    zIndex: 10,
    position: 'sticky',
    top: 0,
    padding: [10, 5, 0, 5],
    backgroundColor: colors.P80,
  },
  logo: {
    height: 70,
    flex: 'none',
    width: 'max-content',
    margin: [0, 10, 10, 10],
  },
  tabsContainer: {
    display: 'flex',
    gap: 10,
    marginTop: 10,
    marginLeft: 40,
    height: 'min-content',
    alignSelf: 'end',
  },
  tab: {
    display: 'block',
    boxSizing: 'border-box',
    width: 'fit-content',
    padding: [5, 10],
    borderRadius: [6, 6, 0, 0],
    border: ['solid', 3, colors.P150],
    borderBottom: 'unset',
    backgroundColor: colors.P150,
    color: colors.W100,
    textDecoration: 'none',
    transition: animations.defaultTransition,
    transitionProperty: ['color', 'backgroundColor'],

    '&[class*="active"]': {
      backgroundColor: colors.W100,
      color: colors.P150,
    },
  },
});
